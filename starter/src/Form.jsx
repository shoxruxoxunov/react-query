import { useState } from 'react';
import { useMutation,useQueryClient } from "@tanstack/react-query";
import customFetch from "./customFetch";

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  const queryClient=useQueryClient()
  queryClient.invalidateQueries({queryKey:["tasks"]})
  
  const { mutate: createTask } = useMutation({
    mutationFn: (title) => customFetch.post(`/`,{title}),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName)
    setNewItemName("")
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn'>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
