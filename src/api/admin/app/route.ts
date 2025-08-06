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
    app: {
      name: "Medusa Admin",
      version: "2.8.8",
      modules: [
        {
          name: "digital-product",
          routes: [
            {
              path: "/digital-products",
              label: "Digital Products",
            }
          ]
        }
      ]
    }
  })
} 