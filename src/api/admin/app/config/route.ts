import { 
  AuthenticatedMedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  // Return admin app configuration
  res.json({
    config: {
      features: {
        digital_products: true,
        file_upload: true,
      },
      modules: {
        digital_product: {
          enabled: true,
          routes: [
            {
              path: "/digital-products",
              label: "Digital Products",
            }
          ]
        }
      },
      settings: {
        file_upload: {
          max_size: "10MB",
          allowed_types: ["pdf", "epub", "zip", "png", "jpg", "jpeg"]
        }
      }
    }
  })
} 