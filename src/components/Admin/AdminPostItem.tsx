import { Button } from "../ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Post {
  id: string;
  title: string;
  created_at: string;
  published: boolean;
}

interface AdminPostItemProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const AdminPostItem = ({ post, onDelete, onEdit }: AdminPostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border mb-2">
      <div>
        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{post.title}</h3>
        <p className="text-sm text-gray-500">
          {format(new Date(post.created_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })} •{" "}
          <span className={post.published ? "text-green-600" : "text-yellow-600 font-medium"}>
            {post.published ? "Publicado" : "Rascunho"}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(post.id)}>
          Editar
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
};
