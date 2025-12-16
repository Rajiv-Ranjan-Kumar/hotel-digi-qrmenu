export type AlertType = "success" | "warning" | "danger";

export interface AlertItem {
    id: number;
    type: AlertType;
    message: string;
}
