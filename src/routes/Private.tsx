import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnections";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps{
    children: ReactNode
}

export function Private({children}: PrivateProps): any{
    return(
        children
    )
}