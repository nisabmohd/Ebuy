import { Schema, model, InferSchemaType } from "mongoose";

const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type TokenSchemaType = InferSchemaType<typeof TokenSchema>;
export default model<TokenSchemaType>("tokens", TokenSchema);
