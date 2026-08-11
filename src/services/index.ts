export type ResponseData = Map<number, AnswerResponse>;

export type AnswerResponse = {
  visited: boolean;
  option: 1 | 2 | 3 | 4 | null;
  review: boolean;
};
