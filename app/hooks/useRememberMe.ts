/* eslint-disable react-hooks/exhaustive-deps */
import { validateEmail } from "@/lib/validation";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { userdataProps } from "../components/types";

export const useRememberMe = (initialValue=true, setUserdata: Dispatch<SetStateAction<userdataProps>>) => {
    const [rememberMe, setRememberMe] = useState<boolean>(initialValue)

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
          if (validateEmail(rememberedUser).valid) {
            setUserdata(prev => ({ ...prev, email: rememberedUser, username: '' }));
          } else {
            setUserdata(prev => ({ ...prev, username: rememberedUser, email: '' }));
          }
          setRememberMe(true);
        }
      }, []);

      return [rememberMe, setRememberMe] as const
}