export type WordEntry = {
  definition: string;
  related: string[];
};

export type Dictionary = Record<string, WordEntry>;
