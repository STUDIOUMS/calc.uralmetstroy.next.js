#!/usr/bin/env python3
"""
Scraper for mc.ru metal prices (Ekaterinburg region).
Fetches product pages and extracts minimum prices via Schema.org meta tags.
Run on: old server 77.222.37.168 (Russian IP, not blocked by mc.ru)
Output: JSON to stdout
"""
import urllib.request
import re
import json
import sys
import time

BASE = "https://mc.ru/region/ekaterinburg/metalloprokat/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9",
}

CATEGORIES = [
    # (slug, display_name, group)
    ("armatura_riflenaya_a3",                       "Арматура рифленая А500С (А3)", "Сортовой"),
    ("armatura_gladkaya_a1",                        "Арматура гладкая А240 (А1)",   "Сортовой"),
    ("ugolok_ravnopolochnyj",                       "Уголок равнополочный",         "Сортовой"),
    ("shveller",                                    "Швеллер",                      "Сортовой"),
    ("balki_dvutavrovye",                           "Балка двутавровая",            "Сортовой"),
    ("krug_g_k",                                    "Круг горячекатаный",           "Сортовой"),
    ("kvadrat_goryachekatanyj",                     "Квадрат горячекатаный",        "Сортовой"),
    ("polosa_g_k",                                  "Полоса горячекатаная",         "Сортовой"),
    ("shestigrannik_goryachekatanyj_konstrukcionnyj","Шестигранник г/к",            "Сортовой"),
    ("stal_listovaya_g_k",                          "Лист горячекатаный",           "Листовой"),
    ("stal_listovaya_h_k",                          "Лист холоднокатаный",          "Листовой"),
    ("stal_listovaya_ocinkovannaya",                "Лист оцинкованный",            "Листовой"),
    ("truby_ehlektrosvarnye_kruglye",               "Труба ЭС круглая",             "Трубы"),
    ("truby_ehlektrosvarnye_kvadratnye",            "Труба профильная квадратная",  "Трубы"),
    ("truby_ehlektrosvarnye_pryamougolnye",         "Труба профильная прямоугольная","Трубы"),
    ("truby_vgp",                                   "Труба ВГП (водогазопроводная)","Трубы"),
]

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        return ""

def parse_min_price(html):
    """Extract minimum price from Schema.org meta tags."""
    prices = re.findall(r'<meta\s+itemprop="price"\s+content="(\d+)"', html)
    if not prices:
        # fallback: look in class="pr" divs
        prices = re.findall(r'class="pr"[^>]*>\s*([\d\s]+)\s*<', html)
        prices = [p.replace(" ", "") for p in prices if p.strip()]
    if prices:
        nums = [int(p) for p in prices if p.isdigit()]
        return min(nums) if nums else None
    return None

def parse_max_price(html):
    prices = re.findall(r'<meta\s+itemprop="price"\s+content="(\d+)"', html)
    if prices:
        nums = [int(p) for p in prices if p.isdigit()]
        return max(nums) if nums else None
    return None

def parse_unit(html):
    """Detect price unit from page."""
    if re.search(r'руб\./т\b|руб/т\b|за тонну', html, re.IGNORECASE):
        return "руб./т"
    if re.search(r'руб\./м\b|руб/м\b|за метр', html, re.IGNORECASE):
        return "руб./м"
    if re.search(r'руб\./м²|за кв\.м', html, re.IGNORECASE):
        return "руб./м²"
    return "руб./т"

def main():
    results = []
    for slug, name, group in CATEGORIES:
        url = BASE + slug
        html = fetch(url)
        if not html:
            results.append({"slug": slug, "name": name, "group": group, "error": True})
            time.sleep(0.5)
            continue
        min_price = parse_min_price(html)
        max_price = parse_max_price(html)
        unit = parse_unit(html)
        results.append({
            "slug": slug,
            "name": name,
            "group": group,
            "minPrice": min_price,
            "maxPrice": max_price,
            "unit": unit,
            "url": f"https://mc.ru/region/ekaterinburg/metalloprokat/{slug}",
        })
        time.sleep(0.5)  # be polite

    print(json.dumps(results, ensure_ascii=False))

if __name__ == "__main__":
    main()
