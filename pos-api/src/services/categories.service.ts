import prisma from "../configs/prisma-client.config"

export const categoriesService = {
    async getAll(){
        return await prisma.category.findMany()
    }
}