from fastapi import APIRouter
from dependencies import *

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        with open(os.path.join("images", file.filename), "wb") as f:
            f.write(file.file.read())

        imageRoute = f"images/{file.filename}"

        image_data = DataImage() 

        width, height = image_data.get_image_dimension(imageRoute)
        megapixels = image_data.get_image_megapixels(imageRoute)
        mean_color = image_data.get_image_mean_color(imageRoute)
        people_count = image_data.get_image_people_count(imageRoute)

        os.remove(imageRoute)

        return JSONResponse(content={
            "message": "Imagen subida con éxito",
            "width": width,
            "height": height, 
            "imageRoute": imageRoute,
            "megapixels": megapixels,
            "mean_color": mean_color,
            "people_count": people_count
        })
    except Exception as e:
        return JSONResponse(content=str(e), status_code=500)

