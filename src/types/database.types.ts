export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cookie_user: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_active: string
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_active?: string
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_active?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      payment: {
        Row: {
          created_at: string
          id: string
          is_expired: boolean
          is_paid: boolean
          paid_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_expired?: boolean
          is_paid?: boolean
          paid_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_expired?: boolean
          is_paid?: boolean
          paid_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "cookie_user"
            referencedColumns: ["id"]
          },
        ]
      }
      provider: {
        Row: {
          admin_price: number
          base_price: number
          created_at: string
          description: string | null
          duration: string
          features: Json | null
          icon: string | null
          id: string
          max_user: number
          min_user: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          admin_price: number
          base_price: number
          created_at?: string
          description?: string | null
          duration: string
          features?: Json | null
          icon?: string | null
          id?: string
          max_user?: number
          min_user?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          admin_price?: number
          base_price?: number
          created_at?: string
          description?: string | null
          duration?: string
          features?: Json | null
          icon?: string | null
          id?: string
          max_user?: number
          min_user?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      ruangan: {
        Row: {
          activated_at: string | null
          created_at: string
          id: string
          provider_id: string
          status: Database["public"]["Enums"]["ruangan_status"]
          updated_at: string
          user_count: number
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          id?: string
          provider_id: string
          status?: Database["public"]["Enums"]["ruangan_status"]
          updated_at?: string
          user_count?: number
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          id?: string
          provider_id?: string
          status?: Database["public"]["Enums"]["ruangan_status"]
          updated_at?: string
          user_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "ruangan_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider"
            referencedColumns: ["id"]
          },
        ]
      }
      ruangan_users: {
        Row: {
          cookie_user_id: string
          created_at: string
          id: string
          joined_at: string
          payment_id: string | null
          ruangan_id: string
          slot_number: number
        }
        Insert: {
          cookie_user_id: string
          created_at?: string
          id?: string
          joined_at?: string
          payment_id?: string | null
          ruangan_id: string
          slot_number: number
        }
        Update: {
          cookie_user_id?: string
          created_at?: string
          id?: string
          joined_at?: string
          payment_id?: string | null
          ruangan_id?: string
          slot_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "ruangan_users_cookie_user_id_fkey"
            columns: ["cookie_user_id"]
            isOneToOne: false
            referencedRelation: "cookie_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ruangan_users_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ruangan_users_ruangan_id_fkey"
            columns: ["ruangan_id"]
            isOneToOne: false
            referencedRelation: "ruangan"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: { Args: { input_name: string }; Returns: string }
    }
    Enums: {
      ruangan_status: "tersedia" | "penuh" | "aktif"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ruangan_status: ["tersedia", "penuh", "aktif"],
    },
  },
} as const
