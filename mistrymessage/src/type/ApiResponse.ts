import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessing?: boolean;
    messages?: Array<Message>;
}