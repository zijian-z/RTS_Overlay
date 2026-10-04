# SC2 race Icons
sc2_race_icon = {
    'Terran': ['人类', 'TerranIcon.webp'],
    'Protoss': ['星灵', 'ProtossIcon.webp'],
    'Zerg': ['异虫', 'ZergIcon.webp'],
    'Any': ['任意', 'AnyRaceIcon.webp'],
}


def get_sc2_faction_selection() -> dict:
    """Get the dictionary used to select the SC2 faction.

    Returns
    -------
    Dictionary with the faction selection choices and related images.
    """
    images_keys = []
    for key, race_image in sc2_race_icon.items():
        assert len(race_image) == 2
        images_keys.append({'key': key, 'image': 'race_icon/' + race_image[1]})

    return {'root_folder': 'game', 'images_keys': images_keys}
