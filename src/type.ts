enum ElementTypes {
  "text",
  "checkbox",
}

export interface Form {
  /**
   * @unique
   */
  id: string;
  name: string;
  elements: Element[];
}

// generic element type
export interface Element {
  /**
   * @unique
   */
  id: string;
  type: ElementTypes;
  label: string;
  /**
   * @default false
   */
  isRequired?: boolean;
  /**
   * @default undefined
   */
  conditions?: Condition[];
  choices?: Choice[];
}

// narrow element's type based on `type` property
export type CheckboxElement = Element & {
  type: ElementTypes.checkbox;
  choices: Choice[];
};
export type TextElement = Element & {
  type: ElementTypes.text;
  choices?: never;
};

export interface Choice {
  /**
   * @unique
   */
  id: string;
  name: string;
}

export interface Condition {
  /**
   * @optional for `nestedConditions`
   */
  targetElementId: Element["id"];
  /**
   * this is a `string` because we are comparing it with the value of the element
   * either `text` or `Choice["id"]
   * @optional for `nestedConditions`
   */
  valueToMatch: string;

  operator: "AND" | "OR";
  nestedConditions?: Condition[];
}
