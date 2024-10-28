import { CSSProperties } from "react";

export interface IToggleButton {
    label?: string;
    onChange?: (state: boolean) => void;
    isToggledByDefault?: boolean;
    style?: CSSProperties;
    labelStyle?: CSSProperties;
    checked?:boolean
}