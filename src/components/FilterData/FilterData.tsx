import FacebookReelData from "../../helper/FacebookReelData.json";

const FilterData = () => {
  const { data } = FacebookReelData;

  const reels = data.map((reel) => {
    const preferredThumbnail = reel.thumbnails.data.find(
      (thumbnail) => thumbnail.is_preferred
    );
    return {
      attachments: {
        data: [
          {
            media_type: "reel",
            media: {
              image: {
                height: preferredThumbnail?.height,
                src: preferredThumbnail?.uri,
                width: preferredThumbnail?.width,
              },
              source: reel.source,
            },
          },
        ],
      },
      updated_time: reel.updated_time,
      message: reel.description,
      is_eligible_for_promotion: true,
      status_type: "reel_video",
      id: reel.id,
    };
  });

  console.log("reels", reels);

  return (
    <div>
      <h1>FilterData</h1>
    </div>
  );
};

export default FilterData;
