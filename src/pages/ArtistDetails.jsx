import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
// useParams gives us access to the song id link

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  // get song id
  const { id: artistId } = useParams();
  const { songid } = useParams();
  // songid comes from the path route which we gave in App
  // get active song and check if its playing
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // get song data as Hook
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  // creating proper loading and error prompts
  if (isFetchingArtistDetails) return;
  <Loader title="Loading Artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader 
      artistId={artistId}
       artistData={artistData} />

      
      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};
export default ArtistDetails;
