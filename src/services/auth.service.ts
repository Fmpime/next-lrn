import {IAuthForm, IAuthResponse} from "@/type/auth.types";
import {axiosClassic} from "@/api/interceptors";
import {removeFromStorage, saveTokenStorage} from "@/services/auth-token.service";

export const authService={
    async main(type:'login' | 'register' , data:IAuthForm){
        const response = await axiosClassic.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )
        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },
    async getNewTokens(){
        const response = await axiosClassic.post<IAuthResponse>(
            '/auth/login/access-token'
        )
        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
    },
    async logout(){
        const response = await axiosClassic.post<boolean>('/auth/logout')
        if (response.data) removeFromStorage()
    }
}
