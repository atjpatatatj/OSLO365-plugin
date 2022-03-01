/** An Oslo cache item */
export interface IOsloItem {
  label: string;
  keyphrase: string;
  description: string;
  reference: string;
  isDictionaryItem: boolean;
}
//TODO make isDictionaryItem optional -> optimise init function
