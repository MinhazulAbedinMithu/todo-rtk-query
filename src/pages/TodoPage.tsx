import Container from "@/components/Container";
import TodoContainer from "@/components/Todo/TodoContainer";

const TodoPage = () => {
  return (
    <Container>
      <h1 className="text-center pt-5 text-3xl">My Todos</h1>
      <TodoContainer />
    </Container>
  );
};

export default TodoPage;
