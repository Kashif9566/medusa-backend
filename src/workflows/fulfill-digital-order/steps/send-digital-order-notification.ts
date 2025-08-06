import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { 
  INotificationModuleService,
  IFileModuleService,
} from "@medusajs/framework/types"
import { ModuleRegistrationName } from "@medusajs/framework/utils"
import { DigitalProductOrder, MediaType } from "../../../modules/digital-product/types"

type SendDigitalOrderNotificationStepInput = {
  digital_product_order: DigitalProductOrder
}

export const sendDigitalOrderNotificationStep = createStep(
  "send-digital-order-notification",
  async ({ 
    digital_product_order: digitalProductOrder, 
  }: SendDigitalOrderNotificationStepInput, 
  { container }) => {
    const notificationModuleService: INotificationModuleService = container
    .resolve(ModuleRegistrationName.NOTIFICATION)
    const fileModuleService: IFileModuleService = container.resolve(
      ModuleRegistrationName.FILE
    )

    const notificationData = await Promise.all(
      digitalProductOrder.products.map(async (product) => {
        const medias: string[] = []

        await Promise.all(
          product.medias
          .filter((media) => media.type === MediaType.MAIN)
          .map(async (media) => {
            const file = await fileModuleService.retrieveFile(media.fileId)
            medias.push(file.url)
          })
        )

        return {
          name: product.name,
          medias,
        }
      })
    )

    if (!digitalProductOrder.order?.email) {
      throw new Error("Order email not found")
    }

    const notification = await notificationModuleService.createNotifications({
      to: digitalProductOrder.order.email,
      template: "digital-order-template",
      channel: "email",
      data: {
        products: notificationData,
      },
    })

    return new StepResponse(notification)
  }
) 