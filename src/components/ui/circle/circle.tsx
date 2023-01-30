import React from "react";
import styles from "./circle.module.css";
import { ElementStates } from "../../../types/element-states";

interface CircleProps {
    state?: ElementStates;
    letter?: string | null;
    head?: string | React.ReactElement | null;
    index?: number;
    tail?: string | React.ReactElement | null;
    tailType?: "string" | "element";
    extraClass?: string;
    isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
                                                  state = ElementStates.Default,
                                                  letter,
                                                  head,
                                                  index,
                                                  tail,
                                                  extraClass = "",
                                                  isSmall,
                                              }) => {
    return (
        <div className={`${styles.content} ${extraClass}`} data-testid="circle" data-cy-state={state}>
            <div
                data-testid="head div"
                className={`text text_type_input text_color_input mb-4 ${
                    styles.absolute
                } ${styles.head} ${
                    styles[typeof head === "string" ? "string" : "element"]
                }`}
            >
                {head}
            </div>
            <div
                data-testid="circle div"
                className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
                    styles[state]
                }`}
            >
                <p
                    data-testid="testCircle"
                    className={`text text_type_circle text_color_input ${styles.letter}`}
                >
                    {letter}
                </p>
            </div>
            <p
                className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
            >
                {index?.toString()}
            </p>
            <div
                data-testid="tail div"
                className={`text text_type_input text_color_input mt-4 ${
                    styles.absolute
                } ${index?.toString() ? styles.tail60 : styles.tail30} ${
                    styles[typeof tail === "string" ? "string" : "element"]
                }`}
            >
                {tail}
            </div>
        </div>
    );
};
