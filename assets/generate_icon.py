import os
from PIL import Image, ImageDraw, ImageFont

def create_icon():
    # 핀터레스트 앱 아이콘 권장 사이즈 (보통 512x512 또는 1024x1024)
    size = 512
    
    # 배경색 (인디고 블루 계열)
    bg_color = (79, 70, 229) # Tailwind indigo-600
    
    # 이미지 생성
    image = Image.new('RGB', (size, size), color=bg_color)
    draw = ImageDraw.Draw(image)
    
    # 중앙에 흰색 원 그리기 (파이 차트 느낌)
    margin = 80
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(255, 255, 255))
    
    # 파이 차트 조각 그리기 (인디고 블루보다 약간 밝은 색)
    draw.pieslice([margin, margin, size-margin, size-margin], start=270, end=360, fill=(129, 140, 248))
    
    # 중앙에 텍스트 그리기 (YG)
    try:
        # 시스템에 폰트가 없을 수 있으므로 기본 폰트 사용
        font = ImageFont.truetype("arial.ttf", 120)
    except:
        font = ImageFont.load_default()
        
    # 텍스트는 생략하고 심플한 파이 차트 로고로만 저장
    
    # 저장
    os.makedirs("D:\\부업\\dividend-calculator\\assets", exist_ok=True)
    image_path = "D:\\부업\\dividend-calculator\\assets\\app_icon.png"
    image.save(image_path)
    print(f"Icon saved to {image_path}")

if __name__ == "__main__":
    create_icon()
