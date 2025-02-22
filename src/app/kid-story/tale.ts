export interface TaleRequest {
  name: string;
  lesson: string;
  age: string;
  step: number;
  elements: string[];
  storyHistory?: string;
  selectedOption?: string;
}

export interface StoryTextResponse {
  story: string;
  choices: string[];
}
