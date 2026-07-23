import os
import random
import requests
from PIL import Image, ImageDraw, ImageFont

# Pinterest API 정보 (GitHub Secrets에서 가져옴)
PINTEREST_ACCESS_TOKEN = os.environ.get("PINTEREST_ACCESS_TOKEN")
BOARD_ID = os.environ.get("PINTEREST_BOARD_ID")

def generate_image():
    # 핀터레스트 최적화 사이즈 (1000x1500)
    width, height = 1000, 1500
    
    # 배경색 랜덤 선택 (금융 느낌의 신뢰감 있는 색상)
    bg_colors = [(15, 23, 42), (30, 58, 138), (17, 24, 39), (7, 89, 133)]
    bg_color = random.choice(bg_colors)
    
    image = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(image)
    
    # 텍스트 내용 랜덤 선택
    topics = [
        ("THE POWER OF\nDIVIDEND DRIP", "Turn $500/mo into a\nRetirement Fortune"),
        ("FIRE MOVEMENT\nSTRATEGY", "Calculate Your Exact\nFinancial Freedom Date"),
        ("COMPOUND INTEREST\nMAGIC", "Watch Your Wealth\nSnowball Over Time"),
        ("DIVIDEND INVESTING\nFOR BEGINNERS", "How to Build a\nPassive Income Machine")
    ]
    title, subtitle = random.choice(topics)
    
    # 폰트 설정 (기본 폰트 사용, 실제 환경에서는 ttf 파일 필요)
    # GitHub Actions 환경에서는 기본 폰트가 제한적이므로 크기만 대략적으로 맞춤
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        sub_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
        brand_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
    except:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        brand_font = ImageFont.load_default()

    # 텍스트 그리기 (가운데 정렬)
    draw.text((width/2, 400), title, font=title_font, fill=(255, 255, 255), anchor="mm", align="center")
    draw.text((width/2, 700), subtitle, font=sub_font, fill=(147, 197, 253), anchor="mm", align="center")
    
    # 하단 브랜딩
    draw.rectangle([(0, height-150), (width, height)], fill=(255, 255, 255))
    draw.text((width/2, height-75), "YieldGrower.com", font=brand_font, fill=(15, 23, 42), anchor="mm")
    
    # 가짜 차트 느낌의 장식 그리기
    points = [(200, 1100), (350, 1050), (500, 900), (650, 950), (800, 750)]
    draw.line(points, fill=(34, 197, 94), width=15)
    for p in points:
        draw.ellipse([p[0]-15, p[1]-15, p[0]+15, p[1]+15], fill=(255, 255, 255), outline=(34, 197, 94), width=5)

    image_path = "pinterest_pin.jpg"
    image.save(image_path)
    return image_path, title.replace('\n', ' ')

def upload_to_pinterest(image_path, title):
    if not PINTEREST_ACCESS_TOKEN or not BOARD_ID:
        print("Error: Missing Pinterest API credentials.")
        return

    # 1. 이미지 업로드를 위한 미디어 등록
    headers = {
        'Authorization': f'Bearer {PINTEREST_ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    # 실제로는 Pinterest API v5를 사용하여 이미지를 먼저 업로드하고 미디어 ID를 받아와야 합니다.
    # 여기서는 구조만 잡아두고, 실제 API 호출 로직은 Pinterest 개발자 문서에 맞게 작성해야 합니다.
    print(f"Generated image: {image_path}")
    print(f"Title: {title}")
    print("Ready to upload to Pinterest API...")
    
    # TODO: Pinterest API v5 연동 코드 작성
    # 1. POST /v5/media (이미지 업로드)
    # 2. POST /v5/pins (핀 생성, link: https://yieldgrower.com)

def main():
    image_path, title = generate_image()
    upload_to_pinterest(image_path, title)

if __name__ == "__main__":
    main()
