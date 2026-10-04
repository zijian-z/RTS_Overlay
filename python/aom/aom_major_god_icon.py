# AoM major god icons (with 3 letters shortcut)
aom_major_god_icon = {
    # Greeks
    'Zeus': ['宙斯', 'zeus.webp'],
    'Hades': ['哈迪斯', 'hades.webp'],
    'Poseidon': ['波塞冬', 'poseidon.webp'],
    'Demeter': ['得墨忒耳', 'demeter.webp'],
    # Egyptians
    'Ra': ['拉', 'ra.webp'],
    'Isis': ['伊西斯', 'isis.webp'],
    'Set': ['塞特', 'set.webp'],
    # Norse
    'Thor': ['托尔', 'thor.webp'],
    'Odin': ['奥丁', 'odin.webp'],
    'Loki': ['洛基', 'loki.webp'],
    'Freyr': ['弗蕾', 'freyr.webp'],
    # Atlanteans
    'Kronos': ['克洛诺斯', 'kronos.webp'],
    'Oranos': ['乌拉诺斯', 'oranos.webp'],
    'Gaia': ['盖亚', 'gaia.webp'],
    # Chinese
    'Fuxi': ['伏羲', 'fuxi.webp'],
    'Nuwa': ['女娲', 'nuwa.webp'],
    'Shennong': ['神农', 'shennong.webp'],
    # Japanese
    'Amaterasu': ['天照', 'amaterasu.webp'],
    'Tsukuyomi': ['月读', 'tsukuyomi.webp'],
    'Susanoo': ['须佐之男', 'susanoo.webp'],
    # Aztecs
    'Huitzilopochtli': ['维齐洛波奇特利', 'huitzilopochtli.webp'],
    'Quetzalcoatl': ['羽蛇神', 'quetzalcoatl.webp'],
    'Tezcatlipoca': ['特斯卡特利波卡', 'tezcatlipoca.webp'],
}


def get_aom_faction_selection() -> dict:
    """Get the dictionary used to select the AoM faction.

    Returns
    -------
    Dictionary with the faction selection choices and related images.
    """
    images_keys = []
    for key, values in aom_major_god_icon.items():
        images_keys.append({'key': key, 'image': 'major_god/' + values[1]})

    return {'root_folder': 'game', 'images_keys': images_keys}
