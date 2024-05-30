
import { currentUser } from "@clerk/nextjs/server";
import MovieDetails from "./components/MovieDetails";
import { prisma } from "@/prisma/prismadb";
type MovieIdPageProps = {
  params: {
    movieId: string
  };
};
const MoviePage = async({ params }: MovieIdPageProps) => {
  
  const {movieId} = params;
  const user=await currentUser();
  const list=await prisma.watchList.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div>
      <MovieDetails id={movieId} list={list}/>
    </div>
  );
};

export default MoviePage;
