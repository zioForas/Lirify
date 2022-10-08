import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
// useParams gives us access to the song id link



import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  // get song id
  const dispatch = useDispatch();
  const { songid } = useParams();
  // songid comes from the path route which we gave in App
  // get active song and check if its playing
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // get song data as Hook
  const {data: songData, isFetching: isFetchingSongDetails } = 
  useGetSongDetailsQuery ({songid});  

  // get related songs 
  const { data, isFetching: isFetchingRelatedSongs, error } =
  useGetSongRelatedQuery(({songid})); 

  // play pause function from SongCard
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // creating proper loading and error prompts
if (isFetchingSongDetails || isFetchingRelatedSongs) return
<Loader title="searching song details" />;
if(error) return <Error />;


  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-semibold">Lyrics:</h2>

        <div className="mt-5">
            {/* first we check if we have the lyrics */}
            {songData?.sections[1].type === 'LYRICS' ?
            // if yes we show the lyrics in the <p>
             songData?.sections[1].text.map((line, i) => (
                <p className="text-slate-300 text-base my-1">{line}</p>
                // if not we say this
             )): <p className="text-slate-300 text-3xl font-bold">No lyrics found</p>}
        </div>
      </div>
      <RelatedSongs 
      data={data}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick}
      />

    </div>
  );
};
export default SongDetails;
