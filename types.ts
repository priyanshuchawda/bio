// Populating the types file which was previously empty.
export interface CellPart {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  analogy: string;
  position: {
    top: string;
    left: string;
  };
}

export interface CellData {
  name: 'Plant Cell' | 'Animal Cell';
  bgColor: string;
  parts: CellPart[];
}

export interface CellDifference {
  id: number;
  feature: string;
  plant: string;
  animal: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
