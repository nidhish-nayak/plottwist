export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            bookmarks: {
                Row: {
                    created_at: string;
                    id: number;
                    scenario_id: number;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    scenario_id: number;
                    user_id?: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    scenario_id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_bookmarks_scenario_id_fkey";
                        columns: ["scenario_id"];
                        isOneToOne: false;
                        referencedRelation: "scenarios";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_bookmarks_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            comments: {
                Row: {
                    comment: string | null;
                    comment_id: string;
                    created_at: string;
                    id: number;
                    scenario_id: number;
                    user_id: string;
                };
                Insert: {
                    comment?: string | null;
                    comment_id?: string;
                    created_at?: string;
                    id?: number;
                    scenario_id: number;
                    user_id?: string;
                };
                Update: {
                    comment?: string | null;
                    comment_id?: string;
                    created_at?: string;
                    id?: number;
                    scenario_id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_comments_scenario_id_fkey";
                        columns: ["scenario_id"];
                        isOneToOne: false;
                        referencedRelation: "scenarios";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_comments_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            profiles: {
                Row: {
                    admin: boolean;
                    bio: string | null;
                    created_at: string;
                    email: string;
                    id: number;
                    image: string | null;
                    links: string[] | null;
                    name: string;
                    normalised_name: string | null;
                    user_id: string;
                };
                Insert: {
                    admin?: boolean;
                    bio?: string | null;
                    created_at?: string;
                    email: string;
                    id?: number;
                    image?: string | null;
                    links?: string[] | null;
                    name: string;
                    normalised_name?: string | null;
                    user_id?: string;
                };
                Update: {
                    admin?: boolean;
                    bio?: string | null;
                    created_at?: string;
                    email?: string;
                    id?: number;
                    image?: string | null;
                    links?: string[] | null;
                    name?: string;
                    normalised_name?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            scenarios: {
                Row: {
                    choices: string[] | null;
                    created_at: string;
                    finished: boolean | null;
                    follow_count: number;
                    id: number;
                    pinned: boolean | null;
                    prompt: string | null;
                    published: boolean | null;
                    story: string | null;
                    title: string;
                    user_id: string;
                };
                Insert: {
                    choices?: string[] | null;
                    created_at?: string;
                    finished?: boolean | null;
                    follow_count?: number;
                    id?: number;
                    pinned?: boolean | null;
                    prompt?: string | null;
                    published?: boolean | null;
                    story?: string | null;
                    title?: string;
                    user_id?: string;
                };
                Update: {
                    choices?: string[] | null;
                    created_at?: string;
                    finished?: boolean | null;
                    follow_count?: number;
                    id?: number;
                    pinned?: boolean | null;
                    prompt?: string | null;
                    published?: boolean | null;
                    story?: string | null;
                    title?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_scenarios_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            add_bookmark_rpc: {
                Args: {
                    b_user_id: string;
                    b_scenario_id: number;
                };
                Returns: undefined;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
      ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;
