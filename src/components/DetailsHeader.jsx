// passing the artist id, data and songata so we can use it in the src
import { Link } from "react-router-dom";

// to make the code dry we create this function that gets the data
// so we just have to call it instead of repeating it
const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div
        className="w-full bg-gradient-to-l from-transparent
     to-black sm:h-48 h-28 "
      />
      <div className="absolute inset-0 flex items-center">
        <img
          alt="Cover"
          src={
            // gets cover art and replaces values in url
            artistId
              ? artist.artwork?.url //calling artist function we made above
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songData?.images?.coverart
          }
          // rounded cover art inside div above
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shdaow-black"
        />
        {/* more information about the artist */}
        <div className="ml-5">
          {/* render the artist name OR song title */}
          <p className="font-bold sm:text-3xl text-xl text-slate-200">
            {artistId ? artist?.name : songData?.title}
          </p>
          {!artistId && (
            // dynamic link to artist
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-slate-400 mt-2">
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24"/>
    </div>
  );
};

export default DetailsHeader;
