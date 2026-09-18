import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface RecebimentoConcretoItem {
  id?: string;
  data: string;
  horario: string;
  caminhao: string;
  motorista: string;
  concreteira: string;
  notaFiscal: string;
  fck: string;
  slump: string;
  volume: string;
  observacoes?: string;
  status: "aprovado" | "reprovado" | "pendente";
  createdAt?: any;
}

export interface PecaEstruturalItem {
  id: string | number;
  tipo: "pilar" | "viga" | "laje" | "sapata";
  nome: string;
  status: "concluido" | "em_andamento" | "planejado" | "atrasado";
  x: number;
  y: number;
  pavimento: string;
  width?: number;
  height?: number;
  data?: string;
  fck?: string;
  volume?: number;
}

const COLECAO_RECEBIMENTOS = "mcc_recebimentos";
const COLECAO_PECAS = "mcc_pecas";

// Salva um novo registro de recebimento de concreto
export const salvarRecebimentoNoFirebase = async (registro: Omit<RecebimentoConcretoItem, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLECAO_RECEBIMENTOS), {
      ...registro,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.warn("Erro ao salvar no Firestore (usando fallback local):", error);
    throw error;
  }
};

// Escuta em tempo real os recebimentos
export const escutarRecebimentos = (
  onUpdate: (recebimentos: RecebimentoConcretoItem[]) => void,
  onError?: (error: any) => void
) => {
  try {
    const q = query(collection(db, COLECAO_RECEBIMENTOS), orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snapshot) => {
        const itens: RecebimentoConcretoItem[] = [];
        snapshot.forEach((doc) => {
          itens.push({ id: doc.id, ...(doc.data() as Omit<RecebimentoConcretoItem, "id">) });
        });
        onUpdate(itens);
      },
      (error) => {
        console.warn("Aviso na escuta de recebimentos do Firestore:", error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn("Falha ao configurar listener de recebimentos:", error);
    if (onError) onError(error);
    return () => {};
  }
};

// Atualiza o status de uma peça estrutural no mapa
export const atualizarStatusPecaNoFirebase = async (
  pecaDocId: string, 
  novoStatus: PecaEstruturalItem["status"]
) => {
  try {
    const pecaRef = doc(db, COLECAO_PECAS, pecaDocId);
    await updateDoc(pecaRef, {
      status: novoStatus,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.warn("Erro ao atualizar status da peça no Firestore:", error);
    throw error;
  }
};
