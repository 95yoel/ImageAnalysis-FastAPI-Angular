from PIL import Image 
import cv2

class DataImage:

    def load_images(self, imageRoute):
        imagePIL = Image.open(imageRoute)
        imageCV2 = cv2.imread(imageRoute)
        return imagePIL, imageCV2
    

    def get_image_dimension(self, imageRoute):
        imagePIL = Image.open(imageRoute)
        width, height = imagePIL.size
        return width, height
    
    def get_image_megapixels(self, imageRoute):
        width, height = self.get_image_dimension(imageRoute)
        return width * height / 1000000
    
    def get_image_mean_color(self, imageRoute):
        imagePIL = Image.open(imageRoute)
        color_mean = imagePIL.convert("RGB").resize((1, 1)).getpixel((0, 0))
        return color_mean
    
    def get_image_people_count(self, imageRoute):
        imageCV2 = cv2.imread(imageRoute)
        hog_cascade = cv2.HOGDescriptor()
        hog_cascade.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
        boxes, weights = hog_cascade.detectMultiScale(imageCV2, winStride=(8, 8), padding=(8, 8), scale=1.03)
        return len(boxes)
    