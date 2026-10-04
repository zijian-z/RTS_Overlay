# AoE4 civilization Icons (with 3 letters shortcut)
aoe4_civilization_icon = {
    'Abbasid Dynasty': ['阿拔斯王朝', 'CivIcon-AbbasidAoE4.webp'],
    'Ayyubids': ['阿尤布', 'CivIcon-AyyubidsAoE4.webp'],
    'Byzantines': ['拜占庭', 'CivIcon-ByzantinesAoE4.webp'],
    'Chinese': ['中国', 'CivIcon-ChineseAoE4.webp'],
    'Delhi Sultanate': ['德里苏丹国', 'CivIcon-DelhiAoE4.webp'],
    'English': ['英格兰', 'CivIcon-EnglishAoE4.webp'],
    'French': ['法兰西', 'CivIcon-FrenchAoE4.webp'],
    'Golden Horde': ['金帐汗国', 'CivIcon-GoldenHordeAoE4.webp'],
    'House of Lancaster': ['兰开斯特王朝', 'CivIcon-HouseofLancasterAoE4.webp'],
    'Holy Roman Empire': ['神圣罗马帝国', 'CivIcon-HREAoE4.webp'],
    'Japanese': ['日本', 'CivIcon-JapaneseAoE4.webp'],
    'Jeanne d\'Arc': ['圣女贞德', 'CivIcon-JeanneDArcAoE4.webp'],
    'Jin Dynasty': ['金朝', 'CivIcon-JinDynastyAoE4.webp'],
    'Knights Templar': ['圣殿骑士团', 'CivIcon-KnightsTemplarAoE4.webp'],
    'Macedonian Dynasty': ['马其顿王朝', 'CivIcon-MacedonianDynastyAoE4.webp'],
    'Malians': ['马里', 'CivIcon-MaliansAoE4.webp'],
    'Mongols': ['蒙古', 'CivIcon-MongolsAoE4.webp'],
    'Order of the Dragon': ['龙骑士团', 'CivIcon-OrderOfTheDragonAoE4.webp'],
    'Ottomans': ['奥斯曼', 'CivIcon-OttomansAoE4.webp'],
    'Rus': ['罗斯', 'CivIcon-RusAoE4.webp'],
    'Sengoku Daimyo': ['战国大名', 'CivIcon-SengokuDaimyoAoE4.webp'],
    'Tughlaq Dynasty': ['图格鲁克王朝', 'CivIcon-TughlaqDynastyAoE4.webp'],
    'Zhu Xi\'s Legacy': ['朱熹遗产', 'CivIcon-ZhuXiLegacyAoE4.webp'],
}


def get_aoe4_faction_selection() -> dict:
    """Get the dictionary used to select the AoE4 faction.

    Returns
    -------
    Dictionary with the faction selection choices and related images.
    """
    images_keys = []
    for key, values in aoe4_civilization_icon.items():
        images_keys.append({'key': key, 'image': 'civilization_flag/' + values[1]})

    return {'root_folder': 'game', 'images_keys': images_keys}
