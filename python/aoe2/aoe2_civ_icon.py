# AoE2 civilization Icons (with 3 letters shortcut)
aoe2_civilization_icon = {
    'all': ['全部', 'check_status.webp'],
    'Generic': ['通用', 'question_mark.webp'],
    'Armenians': ['亚美尼亚', 'CivIcon-Armenians.webp'],
    'Aztecs': ['阿兹特克', 'CivIcon-Aztecs.webp'],
    'Bengalis': ['孟加拉', 'CivIcon-Bengalis.webp'],
    'Berbers': ['柏柏尔', 'CivIcon-Berbers.webp'],
    'Bohemians': ['波希米亚', 'CivIcon-Bohemians.webp'],
    'Britons': ['不列颠', 'CivIcon-Britons.webp'],
    'Burgundians': ['勃艮第', 'CivIcon-Burgundians.webp'],
    'Bulgarians': ['保加利亚', 'CivIcon-Bulgarians.webp'],
    'Burmese': ['缅甸', 'CivIcon-Burmese.webp'],
    'Byzantines': ['拜占庭', 'CivIcon-Byzantines.webp'],
    'Celts': ['凯尔特', 'CivIcon-Celts.webp'],
    'Chinese': ['中国', 'CivIcon-Chinese.webp'],
    'Cumans': ['库曼', 'CivIcon-Cumans.webp'],
    'Danes': ['丹麦', 'CivIcon-Danes.webp'],
    'Dravidians': ['达罗毗荼', 'CivIcon-Dravidians.webp'],
    'Ethiopians': ['埃塞俄比亚', 'CivIcon-Ethiopians.webp'],
    'Franks': ['法兰克', 'CivIcon-Franks.webp'],
    'Georgians': ['格鲁吉亚', 'CivIcon-Georgians.webp'],
    'Goths': ['哥特', 'CivIcon-Goths.webp'],
    'Gurjaras': ['古吉拉特', 'CivIcon-Gurjaras.webp'],
    'Hindustanis': ['印度斯坦', 'CivIcon-Hindustanis.webp'],
    'Huns': ['匈奴', 'CivIcon-Huns.webp'],
    'Incas': ['印加', 'CivIcon-Incas.webp'],
    'Italians': ['意大利', 'CivIcon-Italians.webp'],
    'Japanese': ['日本', 'CivIcon-Japanese.webp'],
    'Jurchens': ['女真', 'CivIcon-Jurchens.webp'],
    'Khitans': ['契丹', 'CivIcon-Khitans.webp'],
    'Khmer': ['高棉', 'CivIcon-Khmer.webp'],
    'Koreans': ['高丽', 'CivIcon-Koreans.webp'],
    'Lithuanians': ['立陶宛', 'CivIcon-Lithuanians.webp'],
    'Magyars': ['马扎尔', 'CivIcon-Magyars.webp'],
    'Mapuche': ['马普切', 'CivIcon-Mapuche.webp'],
    'Mayans': ['玛雅', 'CivIcon-Mayans.webp'],
    'Malay': ['马来', 'CivIcon-Malay.webp'],
    'Malians': ['马里', 'CivIcon-Malians.webp'],
    'Mongols': ['蒙古', 'CivIcon-Mongols.webp'],
    'Muisca': ['穆伊斯卡', 'CivIcon-Muisca.webp'],
    'Persians': ['波斯', 'CivIcon-Persians.webp'],
    'Poles': ['波兰', 'CivIcon-Poles.webp'],
    'Portuguese': ['葡萄牙', 'CivIcon-Portuguese.webp'],
    'Romans': ['罗马', 'CivIcon-Romans.webp'],
    'Saracens': ['萨拉森', 'CivIcon-Saracens.webp'],
    'Saxons': ['撒克逊', 'CivIcon-Saxons.webp'],
    'Shu': ['蜀', 'CivIcon-Shu.webp'],
    'Sicilians': ['西西里', 'CivIcon-Sicilians.webp'],
    'Slavs': ['斯拉夫', 'CivIcon-Slavs.webp'],
    'Spanish': ['西班牙', 'CivIcon-Spanish.webp'],
    'Tatars': ['鞑靼', 'CivIcon-Tatars.webp'],
    'Teutons': ['条顿', 'CivIcon-Teutons.webp'],
    'Tupi': ['图皮', 'CivIcon-Tupi.webp'],
    'Turks': ['突厥', 'CivIcon-Turks.webp'],
    'Varangians': ['瓦兰吉', 'CivIcon-Varangians.webp'],
    'Vietnamese': ['越南', 'CivIcon-Vietnamese.webp'],
    'Vikings': ['维京', 'CivIcon-Vikings.webp'],
    'Wei': ['魏', 'CivIcon-Wei.webp'],
    'Wu': ['吴', 'CivIcon-Wu.webp'],
}


def get_aoe2_faction_selection() -> dict:
    """Get the dictionary used to select the AoE2 faction.

    Returns
    -------
    Dictionary with the faction selection choices and related images.
    """
    images_keys = []
    for key, values in aoe2_civilization_icon.items():
        images_keys.append({'key': key, 'image': 'civilization/' + values[1]})

    return {'root_folder': 'game', 'images_keys': images_keys}
