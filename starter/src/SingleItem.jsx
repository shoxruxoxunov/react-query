import { useMutation,useQueryClient } from "@tanstack/react-query";
import customFetch from "./customFetch";

const SingleItem = ({ item }) => {
  const queryClient=useQueryClient()
  queryClient.invalidateQueries({queryKey:["tasks"]})
  
  const { mutate: upDateItem } = useMutation({
    mutationFn: (itemInfo) => customFetch.patch(`/${itemInfo.id}`,{isDone:itemInfo.isDone}),
  });
  const { mutate: deleteItem } = useMutation({
    mutationFn: (itemId) => customFetch.delete(`/${itemId}`),
  });
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => upDateItem({ id: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteItem(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
