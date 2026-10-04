// -- Age of Empires -- //

/**
 * Check if only one specified civilization is present, for AoE games.
 *
 * @param {string} civilizationName  Requested civilization name.
 *
 * @returns true if only one specified civilization is present.
 */
function checkOnlyCivilizationAoE(civilizationName) {
  const civilizationData = dataBO['civilization'];
  if (Array.isArray(civilizationData)) {
    return civilizationData.toString() === [civilizationName].toString();
  } else {
    return civilizationData === civilizationName;
  }
}

// -- Age of Empires II (AoE2) -- //

/**
 * Get the main HTML content of the resource line (excluding timing) for AoE2.
 *
 * @param {int} currentStep  Requested step for the BO resource line.
 *
 * @returns HTML code corresponding to the requested line.
 */
function getResourceLineAoE2(currentStep) {
  let htmlString = '';

  // Folders with requested pictures
  const gamePicturesFolder = 'assets/' + gameName + '/';
  const resourceFolder = gamePicturesFolder + 'resource/';

  const resources = currentStep.resources;

  htmlString += getBOImageValue(resourceFolder + 'Aoe2de_wood.webp', resources, 'wood');
  htmlString += getBOImageValue(resourceFolder + 'Aoe2de_food.webp', resources, 'food');
  htmlString += getBOImageValue(resourceFolder + 'Aoe2de_gold.webp', resources, 'gold');
  htmlString += getBOImageValue(resourceFolder + 'Aoe2de_stone.webp', resources, 'stone');
  htmlString += getBOImageValue(resourceFolder + 'Aoe2de_hammer.webp', resources, 'builder', true);
  htmlString += getBOImageValue(
    resourceFolder + 'MaleVillDE_alpha.webp',
    currentStep,
    'villager_count',
    true
  );

  // Age image
  const ageImage = {
    1: 'DarkAgeIconDE_alpha.webp',
    2: 'FeudalAgeIconDE_alpha.webp',
    3: 'CastleAgeIconDE_alpha.webp',
    4: 'ImperialAgeIconDE_alpha.webp',
  };

  if (currentStep.age in ageImage) {
    htmlString += getBOImageHTML(gamePicturesFolder + 'age/' + ageImage[currentStep.age]);
  }

  return htmlString;
}

/**
 * Check if the build order is valid, for AoE2.
 *
 * @param {boolean} nameBOMessage  true to add the BO name in the error message.
 *
 * @returns Array of size 2:
 *              0: true if valid build order, false otherwise.
 *              1: String indicating the error (empty if no error).
 */
function checkValidBuildOrderAoE2(nameBOMessage) {
  let BONameStr = '';

  try {
    if (nameBOMessage) {
      BONameStr = dataBO['name'] + ' | ';
    }

    // Check correct civilization
    const validFactionRes = checkValidFaction(BONameStr, 'civilization', false);
    if (!validFactionRes[0]) {
      return validFactionRes;
    }

    fields = [
      new FieldDefinition('villager_count', 'integer', true),
      new FieldDefinition('age', 'integer', true, null, [-Infinity, 4]),
      new FieldDefinition('wood', 'integer', true, 'resources'),
      new FieldDefinition('food', 'integer', true, 'resources'),
      new FieldDefinition('gold', 'integer', true, 'resources'),
      new FieldDefinition('stone', 'integer', true, 'resources'),
      new FieldDefinition('builder', 'integer', false, 'resources'),
      new FieldDefinition('notes', 'array of strings', true),
      new FieldDefinition('time', 'string', false),
    ];

    return checkValidSteps(BONameStr, fields);
  } catch (e) {
    return invalidMsg(BONameStr + e);
  }
}

/**
 * Get one step of the AoE2 build order (template).
 *
 * @param {Array} buildOrderData  Array with the build order step, null for default values.
 * @param {int} copyStepID       ID of the step to copy, -1 for last step.
 *
 * @returns Dictionary with the build order step template.
 */
function getBOStepAoE2(buildOrderData, copyStepID = -1) {
  if (buildOrderData && buildOrderData.length >= 1) {
    // Selected step or last step data (if not valid index)
    const data =
      0 <= copyStepID && copyStepID < buildOrderData.length
        ? buildOrderData[copyStepID]
        : buildOrderData.at(-1);
    return {
      villager_count: 'villager_count' in data ? data['villager_count'] : 0,
      age: 'age' in data ? data['age'] : 1,
      resources: 'resources' in data ? data['resources'] : { wood: 0, food: 0, gold: 0, stone: 0 },
      notes: ['备注'],
    };
  } else {
    return {
      villager_count: 0,
      age: 1,
      resources: { wood: 0, food: 0, gold: 0, stone: 0 },
      notes: ['备注'],
    };
  }
}

/**
 * Get the AoE2 build order template (reset build order).
 *
 * @returns Dictionary with the build order template.
 */
function getBOTemplateAoE2() {
  return {
    name: '建造顺序名称',
    civilization: 'Generic',
    author: '作者',
    source: '来源',
    build_order: [getBOStepAoE2(null)],
  };
}

/**
 * Get the AoE2 villager creation time.
 *
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 *
 * @returns Villager creation time [sec].
 */
function getVillagerTimeAoE2(civilizationFlags, currentAge) {
  console.assert(1 <= currentAge && currentAge <= 4, 'Age expected in [1;4].');
  const genericTime = 25.0;
  if (civilizationFlags['Persians']) {
    return genericTime / (1.0 + 0.05 * currentAge); // 5%/10%/15%/20% faster
  } else {
    // generic
    return genericTime;
  }
}

/**
 * Get the research time to reach the next age, for AoE2.
 *
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 *
 * @returns Requested age up time [sec].
 */
function getResearchAgeUpTimeAoE2(civilizationFlags, currentAge) {
  console.assert(1 <= currentAge && currentAge <= 3, 'Age expected in [1;3].');

  let genericTime = 190.0; // # Imperial age up
  if (currentAge === 1) {
    // Feudal age up
    genericTime = 130.0;
  } else if (currentAge === 2) {
    // Castle age up
    genericTime = 160.0;
  }

  if (civilizationFlags['Persians']) {
    return genericTime / (1.0 + 0.05 * currentAge); // 5%/10%/15%/20% faster
  } else if (civilizationFlags['Malay']) {
    return genericTime / 1.66; // 66% faster
  } else {
    return genericTime;
  }
}

/**
 * Get the loom research time, for AoE2.
 *
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 *
 * @returns Loom research time [sec].
 */
function getLoomTimeAoE2(civilizationFlags, currentAge) {
  console.assert(1 <= currentAge && currentAge <= 4, 'Age expected in [1;4].');
  const genericTime = 25.0;
  if (civilizationFlags['Persians']) {
    return genericTime / (1.0 + 0.05 * currentAge); // 5%/10%/15%/20% faster
  } else if (civilizationFlags['Goths']) {
    return 0.0; // instantaneous
  } else if (civilizationFlags['Portuguese']) {
    return genericTime / 1.25; // 25% faster
  } else {
    return genericTime;
  }
}

/**
 * Get the wheelbarrow/handcart research time, for AoE2.
 *
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 * @param {boolean} wheelbarrowFlag   true: wheelbarrow / false: handcart.
 *
 * @returns Requested research time [sec].
 */
function getWheelbarrowHandcartTimeAoE2(civilizationFlags, currentAge, wheelbarrowFlag) {
  console.assert(1 <= currentAge && currentAge <= 4, 'Age expected in [1;4].');
  const genericTime = wheelbarrowFlag ? 75.0 : 55.0;
  if (civilizationFlags['Persians']) {
    return genericTime / (1.0 + 0.05 * currentAge); // 5%/10%/15%/20% faster
  } else if (civilizationFlags['Vietnamese']) {
    return genericTime / 2.0; // 100% faster
  } else if (civilizationFlags['Vikings']) {
    return 0.0; // free & instantaneous
  } else if (civilizationFlags['Portuguese']) {
    return genericTime / 1.25; // 25% faster
  } else {
    return genericTime;
  }
}

/**
 * Get the town watch/patrol research time, for AoE2.
 *
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 * @param {boolean} townWatchFlag     true: town watch / false: town patrol.
 *
 * @returns Requested research time [sec].
 */
function getTownWatchPatrolTimeAoE2(civilizationFlags, currentAge, townWatchFlag) {
  console.assert(1 <= currentAge && currentAge <= 4, 'Age expected in [1;4].');
  const genericTime = townWatchFlag ? 25.0 : 40.0;
  if (civilizationFlags['Persians']) {
    return genericTime / (1.0 + 0.05 * currentAge); // 5%/10%/15%/20% faster
  } else if (civilizationFlags['Byzantines']) {
    return 0.0; // free & instantaneous
  } else if (civilizationFlags['Portuguese']) {
    return genericTime / 1.25; // 25% faster
  } else {
    return genericTime;
  }
}

/**
 * Get the research time for a given Town Center technology, for AoE2.
 *
 * @param {string} technologyName     Name of the requested technology.
 * @param {Object} civilizationFlags  Dictionary with the civilization flags.
 * @param {int} currentAge            Current age (1: Dark Age, 2: Feudal...).
 *
 * @returns Requested research time [sec].
 */
function getTownCenterResearchTimeAoE2(technologyName, civilizationFlags, currentAge) {
  if (technologyName === 'loom') {
    return getLoomTimeAoE2(civilizationFlags, currentAge);
  } else if (technologyName === 'wheelbarrow') {
    return getWheelbarrowHandcartTimeAoE2(civilizationFlags, currentAge, true);
  } else if (technologyName === 'handcart') {
    return getWheelbarrowHandcartTimeAoE2(civilizationFlags, currentAge, false);
  } else if (technologyName === 'town_watch') {
    return getTownWatchPatrolTimeAoE2(civilizationFlags, currentAge, true);
  } else if (technologyName === 'town_patrol') {
    return getTownWatchPatrolTimeAoE2(civilizationFlags, currentAge, false);
  } else {
    console.log("Warning: unknown TC technology name '" + technologyName + "'.");
    return 0.0;
  }
}

/**
 * Evaluate the time indications for an AoE2 build order.
 *
 * @param {int} timeOffset  Offset to add on the time outputs [sec].
 */
function evaluateBOTimingAoE2(timeOffset) {
  // Specific civilization flags
  civilizationFlags = {
    Bengalis: checkOnlyCivilizationAoE('Bengalis'),
    Chinese: checkOnlyCivilizationAoE('Chinese'),
    Goths: checkOnlyCivilizationAoE('Goths'),
    Malay: checkOnlyCivilizationAoE('Malay'),
    Mayans: checkOnlyCivilizationAoE('Mayans'),
    Persians: checkOnlyCivilizationAoE('Persians'),
    Portuguese: checkOnlyCivilizationAoE('Portuguese'),
    Vietnamese: checkOnlyCivilizationAoE('Vietnamese'),
    Vikings: checkOnlyCivilizationAoE('Vikings'),
  };

  // Starting villagers
  let lastVillagerCount = 3;
  if (civilizationFlags['Chinese']) {
    lastVillagerCount = 6;
  } else if (civilizationFlags['Mayans']) {
    lastVillagerCount = 4;
  }

  let currentAge = 1; // Current age (1: Dark Age, 2: Feudal Age...)

  // TC technologies to research
  TCTechnologies = {
    loom: { researched: false, image: 'town_center/LoomDE.webp' },
    wheelbarrow: { researched: false, image: 'town_center/WheelbarrowDE.webp' },
    handcart: { researched: false, image: 'town_center/HandcartDE.webp' },
    town_watch: { researched: false, image: 'town_center/TownWatchDE.webp' },
    town_patrol: { researched: false, image: 'town_center/TownPatrolDE.webp' },
  };

  let lastTimeSec = timeOffset; // time of the last step

  if (!('build_order' in dataBO)) {
    console.log(
      'Warning: the "build_order" field is missing from data when evaluating the timing.'
    );
    return;
  }

  const buildOrderData = dataBO['build_order'];
  const stepCount = buildOrderData.length;

  let nextAgeFlag = false; // true when next age is being researched

  // Loop on all the build order steps
  for (const [currentStepID, currentStep] of enumerate(buildOrderData)) {
    stepTotalTime = 0.0; // total time for this step

    // Villager count
    let villagerCount = currentStep['villager_count'];
    if (villagerCount < 0) {
      const resources = currentStep['resources'];
      villagerCount =
        Math.max(0, resources['wood']) +
        Math.max(0, resources['food']) +
        Math.max(0, resources['gold']) +
        Math.max(0, resources['stone']);
      if ('builder' in resources) {
        villagerCount += Math.max(0, resources['builder']);
      }
    }

    villagerCount = Math.max(lastVillagerCount, villagerCount);
    const updateVillagerCount = villagerCount - lastVillagerCount;
    lastVillagerCount = villagerCount;

    stepTotalTime += updateVillagerCount * getVillagerTimeAoE2(civilizationFlags, currentAge);

    // Next age
    const nextAge =
      1 <= currentStep['age'] && currentStep['age'] <= 4 ? currentStep['age'] : currentAge;
    if (nextAge === currentAge + 1) // researching next age up
    {
      stepTotalTime += getResearchAgeUpTimeAoE2(civilizationFlags, currentAge);
      nextAgeFlag = true;
    } else if (nextAgeFlag) {
      // age up was just researched the step before
      if (civilizationFlags['Bengalis']) {
        // Spawn 2 villagers when reaching next age
        stepTotalTime -= 2 * getVillagerTimeAoE2(civilizationFlags, currentAge);
      }
      nextAgeFlag = false;
    }

    // Check for TC technologies in notes
    for (const note of currentStep['notes']) {
      for (const [technologyName, technologyData] of Object.entries(TCTechnologies)) {
        if (!technologyData['researched'] && note.includes('@' + technologyData['image'] + '@')) {
          stepTotalTime += getTownCenterResearchTimeAoE2(
            technologyName,
            civilizationFlags,
            currentAge
          );
          technologyData['researched'] = true;
        }
      }
    }

    // Update time
    lastTimeSec += stepTotalTime;

    currentAge = nextAge; // current age update

    // Update build order with time
    currentStep['time'] = buildOrderTimeToStr(Math.round(lastTimeSec));

    // Special case for last step (add 1 sec to avoid displaying both at the
    // same time)
    if (
      currentStepID === stepCount - 1 &&
      stepCount >= 2 &&
      currentStep['time'] === buildOrderData[currentStepID - 1]['time']
    ) {
      currentStep['time'] = buildOrderTimeToStr(Math.round(lastTimeSec + 1.0));
    }
  }
}

/**
 * Get the images available for AoE2, sorted by sub-folder.
 *
 * @returns Dictionary with all the images per sub-folder.
 */
function getImagesAoE2() {
  // This is obtained using the 'python/utilities/list_images.py' script.
  let imagesDict = {
    age: 'AgeUnknown.webp#CastleAgeIconDE.webp#CastleAgeIconDE_alpha.webp#DarkAgeIconDE.webp#DarkAgeIconDE_alpha.webp#FeudalAgeIconDE.webp#FeudalAgeIconDE_alpha.webp#ImperialAgeIconDE.webp#ImperialAgeIconDE_alpha.webp',
    animal:
      'AoE2DE_ingame_goose_icon.webp#AoE2DE_ingame_ibex_icon.webp#AoE2_DE_box_turtles_icon.webp#AoE2_DE_dolphin_icon.webp#AoE2_DE_dorado_icon.webp#AoE2_DE_marlin_icon.webp#AoE2_DE_perch_icon.webp#AoE2_DE_salmon_icon.webp#AoE2_DE_shore_fish_icon.webp#AoE2_DE_snapper_icon.webp#AoE2_DE_tuna_icon.webp#Boar_aoe2DE.webp#CowDE.webp#Deer_aoe2DE.webp#Elephant_aoe2DE.webp#Goat_aoe2DE.webp#Llama_aoe2DE.webp#Ostrich_icon_aoe2de.webp#Pig_aoe2DE.webp#Rhinoceros_aoe2DE.webp#Sheep_aoe2DE.webp#Turkey_aoe2DE.webp#Wild_Chicken.webp#Yak_aoe2DE.webp#Zebra_aoe2DE.webp',
    archery_range:
      'Aoe2de_DOI_elephant_archer_icon.webp#ArbalestDE.webp#Arbalester_aoe2DE.webp#Archery_range_aoe2DE.webp#Archer_aoe2DE.webp#Cavalryarcher_aoe2DE.webp#Cranequins.webp#Crossbowman_aoe2DE.webp#ElephantArcherIcon-DE.webp#Elite_skirmisher_aoe2DE.webp#Hand_cannoneer_aoe2DE.webp#Heavy-cavalry-archer-resear.webp#Heavycavalryarcher_aoe2de.webp#Heavy_Mounted_Crossbowman.webp#ImperialSkirmisherUpgDE.webp#Mounted_Crossbowman.webp#ParthianTacticsDE.webp#Skirmisher_aoe2DE.webp#ThumbRingDE.webp',
    barracks:
      'Aoe2-infantry-2-pikeman.webp#ArsonDE.webp#Barracks_aoe2DE.webp#ChampionUpgDE.webp#Champion_aoe2DE.webp#Champi_Runner.webp#Champi_Scout.webp#Champi_Warrior.webp#Eaglescout_aoe2DE.webp#EagleWarriorUpgDE.webp#Eaglewarrior_aoe2DE.webp#EliteEagleWarriorUpgDE.webp#EliteEaglewarrior_aoe2DE.webp#Elite_Champi_Warrior.webp#Elite_Fire_Lancer.webp#Elite_Varangian_Guard.webp#Fire_Lancer.webp#GambesonsDE.webp#HalberdierDE.webp#Halberdier_aoe2DE.webp#LongSwordmanUpgDE.webp#Longswordsman_aoe2DE.webp#ManAtArmsUpgDE.webp#Manatarms_aoe2DE.webp#MilitiaDE.webp#PikemanUpDE.webp#Spearman_aoe2DE.webp#SquiresDE.webp#Suplliesicon.webp#TwoHandedSwordsmanUpgDE.webp#Twohanded_aoe2DE.webp#Varangian_Guard.webp',
    blacksmith:
      'Blacksmith_aoe2de.webp#BlastFurnaceDE.webp#BodkinArrowDE.webp#BracerDE.webp#ChainBardingDE.webp#ChainMailArmorDE.webp#FletchingDE.webp#Forging_aoe2de.webp#IronCastingDE.webp#LeatherArcherArmorDE.webp#PaddedArcherArmorDE.webp#PlateBardingArmorDE.webp#PlateMailArmorDE.webp#RingArcherArmorDE.webp#ScaleBardingArmorDE.webp#ScaleMailArmorDE.webp',
    castle:
      'CastleAgeUnique.webp#Castle_aoe2DE.webp#ConscriptionDE.webp#HoardingsDE.webp#Petard_aoe2DE.webp#SapperDE.webp#SpiesDE.webp#Trebuchet_aoe2DE.webp#Unique-tech-imperial.webp',
    civilization:
      'check_status.webp#check_status_black.webp#CivIcon-Armenians.webp#CivIcon-Aztecs.webp#CivIcon-Bengalis.webp#CivIcon-Berbers.webp#CivIcon-Bohemians.webp#CivIcon-Britons.webp#CivIcon-Bulgarians.webp#CivIcon-Burgundians.webp#CivIcon-Burmese.webp#CivIcon-Byzantines.webp#CivIcon-Celts.webp#CivIcon-Chinese.webp#CivIcon-Cumans.webp#CivIcon-Danes.webp#CivIcon-Dravidians.webp#CivIcon-Ethiopians.webp#CivIcon-Franks.webp#CivIcon-Georgians.webp#CivIcon-Goths.webp#CivIcon-Gurjaras.webp#CivIcon-Hindustanis.webp#CivIcon-Huns.webp#CivIcon-Incas.webp#CivIcon-Indians.webp#CivIcon-Italians.webp#CivIcon-Japanese.webp#CivIcon-Jurchens.webp#CivIcon-Khitans.webp#CivIcon-Khmer.webp#CivIcon-Koreans.webp#CivIcon-Lithuanians.webp#CivIcon-Magyars.webp#CivIcon-Malay.webp#CivIcon-Malians.webp#CivIcon-Mapuche.webp#CivIcon-Mayans.webp#CivIcon-Mongols.webp#CivIcon-Muisca.webp#CivIcon-Persians.webp#CivIcon-Poles.webp#CivIcon-Portuguese.webp#CivIcon-Romans.webp#CivIcon-Saracens.webp#CivIcon-Saxons.webp#CivIcon-Shu.webp#CivIcon-Sicilians.webp#CivIcon-Slavs.webp#CivIcon-Spanish.webp#CivIcon-Tatars.webp#CivIcon-Teutons.webp#CivIcon-Tupi.webp#CivIcon-Turks.webp#CivIcon-Varangians.webp#CivIcon-Vietnamese.webp#CivIcon-Vikings.webp#CivIcon-Wei.webp#CivIcon-Wu.webp#question_mark.webp#question_mark_black.webp',
    defensive_structures:
      'Bombard_tower_aoe2DE.webp#Donjon_aoe2DE.webp#FortifiedWallDE.webp#Gate_aoe2de.webp#Krepost_aoe2de.webp#Outpost_aoe2de.webp#Palisade_gate_aoe2DE.webp#Palisade_wall_aoe2de.webp#Stone_wall_aoe2de.webp#Tower_aoe2de.webp',
    dock: 'Cannon_galleon_aoe2DE.webp#CareeningDE.webp#Carrack.webp#Catapult_Galleon.webp#DemolitionShipUpgrade.webp#Demoraft_aoe2DE.webp#Demoship_aoe2DE.webp#Dock_aoe2de.webp#Dragonship.webp#DryDockDE.webp#Elite-cannon-galleon-resear.webp#Elite_cannon_galleon_aoe2de.webp#Fastfireship_aoe2DE.webp#Fireship_aoe2DE.webp#Fire_galley_aoe2DE.webp#FishingShipDE.webp#Fishing_Lines.webp#Fish_trap_aoe2DE.webp#GalleonUpgDE.webp#Galleon_aoe2DE.webp#Galley_aoe2DE.webp#GillnetsDE.webp#Heavydemoship_aoe2de.webp#Heavy_Warships.webp#Hulk.webp#Longship.webp#Lou_Chuan.webp#Medium_Warships.webp#ShipwrightDE.webp#Trade_cog_aoe2DE.webp#Transportship_aoe2DE.webp#WarGalleyDE.webp#War_galley_aoe2DE.webp#War_Hulk.webp',
    hero: 'Cao_Cao.webp#Liu_Bei.webp#Sun_Jian.webp',
    lumber_camp: 'BowSawDE.webp#DoubleBitAxe_aoe2DE.webp#Lumber_camp_aoe2de.webp#TwoManSawDE.webp',
    market:
      'BankingDE.webp#CaravanDE.webp#CoinageDE.webp#GuildsDE.webp#Market_aoe2DE.webp#Tradecart_aoe2DE.webp',
    mill: 'Aoe2-icon--folwark.webp#CropRotationDE.webp#Domestication.webp#FarmDE.webp#HeavyPlowDE.webp#HorseCollarDE.webp#Mill_aoe2de.webp#Pastoralism.webp#Pasture.webp#Transhumance.webp',
    mining_camp:
      'GoldMiningDE.webp#GoldShaftMiningDE.webp#Mining_camp_aoe2de.webp#StoneMiningDE.webp#StoneShaftMiningDE.webp',
    monastery:
      'AtonementDE.webp#BlockPrintingDE.webp#FaithDE.webp#FervorDE.webp#FortifiedChurch.webp#HerbalDE.webp#HeresyDE.webp#IlluminationDE.webp#MonasteryAoe2DE.webp#Monk_aoe2DE.webp#RedemptionDE.webp#SanctityDE.webp#TheocracyDE.webp',
    other:
      'Ao2de_caravanserai_icon.webp#Feitoria_aoe2DE.webp#House_aoe2DE.webp#MuleCart.webp#Settlement.webp#Wonder_aoe2DE.webp',
    resource:
      'Aoe2de_food.webp#Aoe2de_gold.webp#Aoe2de_hammer.webp#Aoe2de_stone.webp#Aoe2de_wood.webp#BerryBushDE.webp#FEMALEVILLDE.webp#MaleVillDE.webp#MaleVillDE_alpha.webp#tree.webp#villager.webp',
    siege_workshop:
      'AoE2DE_Armored_Elephant_icon.webp#AoE2DE_Siege_Elephant_icon.webp#Battering_ram_aoe2DE.webp#Bombard_cannon_aoe2DE.webp#CappedRamDE.webp#Capped_ram_aoe2DE.webp#HeavyScorpionDE.webp#Heavyscorpion_aoe2DE.webp#Heavy_Rocket_Cart.webp#Mangonel_aoe2DE.webp#OnagerDE.webp#Onager_aoe2DE.webp#Rocket_Cart.webp#Scorpion_aoe2DE.webp#Siege-ram-research.webp#SiegeOnagerDE.webp#Siegetower_aoe2DE.webp#Siege_onager_aoe2DE.webp#Siege_ram_aoe2DE.webp#Siege_workshop_aoe2DE.webp#Traction_Trebuchet.webp',
    stable:
      'Aoe2de_camel_scout.webp#Aoe2_heavycamelriderDE.webp#Battle_elephant_aoe2DE.webp#BloodlinesDE.webp#Camelrider_aoe2DE.webp#Cavalier-research.webp#Cavalier_aoe2DE.webp#EliteBattleElephantUpg.webp#Elitesteppelancericon.webp#EliteSteppeLancerUpgDE.webp#Elite_battle_elephant_aoe2DE.webp#HeavyCamelUpgDE.webp#Heavy_Hei_Guang_Cavalry.webp#Hei_Guang_Cavalry.webp#HusbandryDE.webp#Hussar_aoe2DE.webp#Hussar_upgrade_aoe2de.webp#Knight_aoe2DE.webp#Light-cavalry-research.webp#Lightcavalry_aoe2DE.webp#Paladin-research.webp#Paladin_aoe2DE.webp#Scoutcavalry_aoe2DE.webp#Stable_aoe2DE.webp#Steppelancericon.webp#Winged-hussar_upgrade.webp',
    town_center:
      'HandcartDE.webp#LoomDE.webp#Towncenter_aoe2DE.webp#TownPatrolDE.webp#TownWatchDE.webp#WheelbarrowDE.webp',
    unique_unit:
      'Aoe2-icon--houfnice.webp#Aoe2-icon--obuch.webp#Aoe2-icon-coustillier.webp#Aoe2-icon-flemish-militia.webp#Aoe2-icon-hussite-wagon.webp#Aoe2-icon-serjeant.webp#Aoe2de_camel_scout.webp#Aoe2de_Chakram.webp#Aoe2de_Ghulam.webp#Aoe2de_ratha_ranged.webp#Aoe2de_shrivamsha_rider.webp#Aoe2de_Thirisadai.webp#Aoe2de_Urumi.webp#Arambaiicon-DE.webp#Ballistaelephanticon-DE.webp#BerserkIcon-DE.webp#Blackwood_Archer.webp#Bolas_Rider.webp#BoyarIcon-DE.webp#CamelArcherIcon-DE.webp#CaravelIcon-DE.webp#CataphractIcon-DE.webp#Centurion-DE.webp#ChukoNuIcon-DE.webp#CompositeBowman.webp#CondottieroIcon-DE.webp#ConquistadorIcon-DE.webp#Dromon-DE.webp#Fire_Archer.webp#Flaming_camel_icon.webp#GbetoIcon-DE.webp#GenitourIcon-DE.webp#GenoeseCrossbowmanIcon-DE.webp#Grenadier.webp#Guecha_Warrior.webp#Hearth_Troop.webp#HuskarlIcon-DE.webp#Ibirapema_Warrior.webp#ImperialCamelRiderIcon-DE.webp#Imperialskirmishericon-DE.webp#Iron_Pagoda.webp#JaguarWarriorIcon-DE.webp#JanissaryIcon-DE.webp#Jarl.webp#Jian_Swordsman_strong.webp#Jomsviking.webp#KamayukIcon-DE.webp#Karambitwarrioricon-DE.webp#Keshikicon.webp#Kipchakicon.webp#Kona.webp#Konnikicon.webp#Legionary-DE.webp#Leitisicon.webp#Liao_Dao.webp#LongboatIcon-DE.webp#LongbowmanIcon-DE.webp#MagyarHuszarIcon-DE.webp#MamelukeIcon-DE.webp#MangudaiIcon-DE.webp#MissionaryIcon-DE.webp#Monaspa.webp#Mounted_Trebuchet.webp#OrganGunIcon-DE.webp#PlumedArcherIcon-DE.webp#Rattanarchericon-DE.webp#SamuraiIcon-DE.webp#Shotelwarrioricon-DE.webp#SlingerIcon-DE.webp#TarkanIcon-DE.webp#Temple_Guard.webp#TeutonicKnightIcon-DE.webp#ThrowingAxemanIcon-DE.webp#Tiger_Cavalry.webp#TurtleShipIcon-DE.webp#WarElephantIcon-DE.webp#WarriorPriest.webp#WarWagonIcon-DE.webp#War_Chariot.webp#White_Feather_Guard.webp#WoadRaiderIcon-DE.webp#Xianbei_Raider.webp',
    university:
      'ArchitectureDE.webp#ArrowSlitsDE.webp#BallisticsDE.webp#BombardTower_aoe2DE.webp#Careening.webp#Carvel_Hull.webp#ChemistryDE.webp#Clinker_Construction.webp#Dry_Dock.webp#FortifiedWallDE.webp#HeatedShotDE.webp#Incendiaries.webp#Masonry_aoe2de.webp#MurderHolesDE.webp#SiegeEngineersDE.webp#Siphons.webp#Tower_aoe2de.webp#TreadmillCraneDE.webp#University_AoE2_DE.webp',
  };

  // Split each string (e.g. 'image_0#image_1#image_2') in a list of images.
  for (const [key, value] of Object.entries(imagesDict)) {
    imagesDict[key] = value.split('#');
  }

  return imagesDict;
}

/**
 * Get the factions with 3 letters shortcut and icon, for AoE2.
 *
 * @returns Dictionary with faction name as key, and its 3 letters + image as value.
 */
function getFactionsAoE2() {
  // AoE2 civilization Icons (with 3 letters shortcut)
  return {
    All: ['全部', 'check_status_black.webp'],
    Generic: ['通用', 'question_mark_black.webp'],
    Armenians: ['亚美尼亚', 'CivIcon-Armenians.webp'],
    Aztecs: ['阿兹特克', 'CivIcon-Aztecs.webp'],
    Bengalis: ['孟加拉', 'CivIcon-Bengalis.webp'],
    Berbers: ['柏柏尔', 'CivIcon-Berbers.webp'],
    Bohemians: ['波希米亚', 'CivIcon-Bohemians.webp'],
    Britons: ['不列颠', 'CivIcon-Britons.webp'],
    Burgundians: ['勃艮第', 'CivIcon-Burgundians.webp'],
    Bulgarians: ['保加利亚', 'CivIcon-Bulgarians.webp'],
    Burmese: ['缅甸', 'CivIcon-Burmese.webp'],
    Byzantines: ['拜占庭', 'CivIcon-Byzantines.webp'],
    Celts: ['凯尔特', 'CivIcon-Celts.webp'],
    Chinese: ['中国', 'CivIcon-Chinese.webp'],
    Cumans: ['库曼', 'CivIcon-Cumans.webp'],
    Danes: ['丹麦', 'CivIcon-Danes.webp'],
    Dravidians: ['达罗毗荼', 'CivIcon-Dravidians.webp'],
    Ethiopians: ['埃塞俄比亚', 'CivIcon-Ethiopians.webp'],
    Franks: ['法兰克', 'CivIcon-Franks.webp'],
    Georgians: ['格鲁吉亚', 'CivIcon-Georgians.webp'],
    Goths: ['哥特', 'CivIcon-Goths.webp'],
    Gurjaras: ['古吉拉特', 'CivIcon-Gurjaras.webp'],
    Hindustanis: ['印度斯坦', 'CivIcon-Hindustanis.webp'],
    Huns: ['匈奴', 'CivIcon-Huns.webp'],
    Incas: ['印加', 'CivIcon-Incas.webp'],
    Italians: ['意大利', 'CivIcon-Italians.webp'],
    Japanese: ['日本', 'CivIcon-Japanese.webp'],
    Jurchens: ['女真', 'CivIcon-Jurchens.webp'],
    Khitans: ['契丹', 'CivIcon-Khitans.webp'],
    Khmer: ['高棉', 'CivIcon-Khmer.webp'],
    Koreans: ['高丽', 'CivIcon-Koreans.webp'],
    Lithuanians: ['立陶宛', 'CivIcon-Lithuanians.webp'],
    Magyars: ['马扎尔', 'CivIcon-Magyars.webp'],
    Mapuche: ['马普切', 'CivIcon-Mapuche.webp'],
    Mayans: ['玛雅', 'CivIcon-Mayans.webp'],
    Malay: ['马来', 'CivIcon-Malay.webp'],
    Malians: ['马里', 'CivIcon-Malians.webp'],
    Mongols: ['蒙古', 'CivIcon-Mongols.webp'],
    Muisca: ['穆伊斯卡', 'CivIcon-Muisca.webp'],
    Persians: ['波斯', 'CivIcon-Persians.webp'],
    Poles: ['波兰', 'CivIcon-Poles.webp'],
    Portuguese: ['葡萄牙', 'CivIcon-Portuguese.webp'],
    Romans: ['罗马', 'CivIcon-Romans.webp'],
    Saracens: ['萨拉森', 'CivIcon-Saracens.webp'],
    Saxons: ['撒克逊', 'CivIcon-Saxons.webp'],
    Shu: ['蜀', 'CivIcon-Shu.webp'],
    Sicilians: ['西西里', 'CivIcon-Sicilians.webp'],
    Slavs: ['斯拉夫', 'CivIcon-Slavs.webp'],
    Spanish: ['西班牙', 'CivIcon-Spanish.webp'],
    Tatars: ['鞑靼', 'CivIcon-Tatars.webp'],
    Teutons: ['条顿', 'CivIcon-Teutons.webp'],
    Tupi: ['图皮', 'CivIcon-Tupi.webp'],
    Turks: ['突厥', 'CivIcon-Turks.webp'],
    Varangians: ['瓦兰吉', 'CivIcon-Varangians.webp'],
    Vietnamese: ['越南', 'CivIcon-Vietnamese.webp'],
    Vikings: ['维京', 'CivIcon-Vikings.webp'],
    Wei: ['魏', 'CivIcon-Wei.webp'],
    Wu: ['吴', 'CivIcon-Wu.webp'],
  };
}

/**
 * Get the folder containing the faction images, for AoE2.
 *
 * @returns Requested folder name.
 */
function getFactionImagesFolderAoE2() {
  return 'civilization';
}

/**
 * Get the instructions for AoE2.
 *
 * @returns Requested instructions.
 */
function getInstructionsAoE2() {
  const externalBOLines = [
    '在<b>来自外部网站</b>区域，可以从以下网站获取符合格式的建造顺序：',
    '<b>Build Order Guide</b> 或 <b>RTS Builds</b>（可使用左侧快捷方式）。',
    '  - 在 <b>Build Order Guide</b> 上选择建造顺序，点击 <b>Export for RTS</b>，再把内容粘贴到下方面板。',
    '  - 在 <b>RTS Builds</b> 上选择建造顺序，点击 <b>Open in RTS Overlay</b>。',
  ];
  return contentArrayToDiv(getArrayInstructions(externalBOLines));
}

/**
 * Get HTML code for the visual editor sample, for AoE2.
 *
 * @returns HTML code
 */
function getVisualEditorAoE2() {
  // Image folders
  const common = 'assets/common/';
  const game = 'assets/' + gameName + '/';
  const resource = game + '/resource/';

  // Description for each column
  let columnsDescription = [
    new SinglePanelColumn('age'),
    new SinglePanelColumn('time', common + 'icon/time.webp'),
    new SinglePanelColumn('villager_count', resource + 'MaleVillDE_alpha.webp'),
    new SinglePanelColumn('resources/wood', resource + 'Aoe2de_wood.webp'),
    new SinglePanelColumn('resources/food', resource + 'Aoe2de_food.webp'),
    new SinglePanelColumn('resources/gold', resource + 'Aoe2de_gold.webp'),
    new SinglePanelColumn('resources/stone', resource + 'Aoe2de_stone.webp'),
    new SinglePanelColumn('resources/builder', resource + 'Aoe2de_hammer.webp'),
  ];

  columnsDescription[0].text = '时代'; // age selection
  columnsDescription[0].isSelectwidget = true; // age selection
  columnsDescription[1].italic = true; // time
  columnsDescription[1].optional = true; // time
  columnsDescription[2].bold = true; // villager count
  columnsDescription[2].backgroundColor = [50, 50, 50]; // villager count
  columnsDescription[3].backgroundColor = [94, 72, 56]; // wood
  columnsDescription[4].backgroundColor = [153, 94, 89]; // food
  columnsDescription[5].backgroundColor = [135, 121, 78]; // gold
  columnsDescription[6].backgroundColor = [100, 100, 100]; // stone
  columnsDescription[7].optional = true; // builder

  columnsDescription[1].tooltip = '步骤结束时间，格式为 x:yy'; // time
  columnsDescription[2].tooltip = '村民数量'; // villager count
  columnsDescription[3].tooltip = '采集木材的村民'; // wood
  columnsDescription[4].tooltip = '采集食物的村民'; // food
  columnsDescription[5].tooltip = '采集黄金的村民'; // gold
  columnsDescription[6].tooltip = '采集石头的村民'; // stone
  columnsDescription[7].tooltip = '建造者数量'; // builder

  // Show only positive characters for resources
  for (let i = 2; i <= 7; i++) {
    columnsDescription[i].isIntegerInRawBO = true;
    columnsDescription[i].showOnlyPositive = true;
  }
  columnsDescription[0].isIntegerInRawBO = true; // age selection

  // Age selection
  visualEditortableWidgetDescription = [
    [-1, '未知', 'age/AgeUnknown.webp'],
    [1, '黑暗', 'age/DarkAgeIconDE_alpha.webp'],
    [2, '封建', 'age/FeudalAgeIconDE_alpha.webp'],
    [3, '城堡', 'age/CastleAgeIconDE_alpha.webp'],
    [4, '帝王', 'age/ImperialAgeIconDE_alpha.webp'],
  ];

  return getVisualEditorFromDescription(columnsDescription);
}

/**
 * Open a new page displaying the full BO in a single panel, for AoE2.
 */
function openSinglePanelPageAoE2() {
  // Image folders
  const common = 'assets/common/';
  const game = 'assets/' + gameName + '/';
  const resource = game + '/resource/';

  // Description for each column
  let columnsDescription = [
    new SinglePanelColumn('time', common + 'icon/time.webp'),
    new SinglePanelColumn('villager_count', resource + 'MaleVillDE_alpha.webp'),
    new SinglePanelColumn('resources/builder', resource + 'Aoe2de_hammer.webp'),
    new SinglePanelColumn('resources/wood', resource + 'Aoe2de_wood.webp'),
    new SinglePanelColumn('resources/food', resource + 'Aoe2de_food.webp'),
    new SinglePanelColumn('resources/gold', resource + 'Aoe2de_gold.webp'),
    new SinglePanelColumn('resources/stone', resource + 'Aoe2de_stone.webp'),
  ];

  columnsDescription[0].italic = true; // time
  columnsDescription[0].hideIfAbsent = true; // time
  columnsDescription[0].textAlign = 'right'; // time
  columnsDescription[1].bold = true; // villager count
  columnsDescription[2].hideIfAbsent = true; // builder
  columnsDescription[3].backgroundColor = [94, 72, 56]; // wood
  columnsDescription[4].backgroundColor = [153, 94, 89]; // food
  columnsDescription[5].backgroundColor = [135, 121, 78]; // gold
  columnsDescription[6].backgroundColor = [100, 100, 100]; // stone

  // all columns, except time
  for (let i = 1; i <= 6; i++) {
    columnsDescription[i].displayIfPositive = true;
  }

  // Sections Header
  const topArrow = getBOImageHTML(common + 'icon/top_arrow.webp');
  const sectionsHeader = {
    key: 'age', // Key to look for
    // Header before the current row
    before: {
      2: topArrow + '升至封建时代',
      3: topArrow + '升至城堡时代',
      4: topArrow + '升至帝王时代',
    },
    // Header after the current row
    after: {
      1: getBOImageHTML(game + 'age/DarkAgeIconDE_alpha.webp') + '黑暗时代',
      2: getBOImageHTML(game + 'age/FeudalAgeIconDE_alpha.webp') + '封建时代',
      3: getBOImageHTML(game + 'age/CastleAgeIconDE_alpha.webp') + '城堡时代',
      4: getBOImageHTML(game + 'age/ImperialAgeIconDE_alpha.webp') + '帝王时代',
    },
  };
  // Header for first line
  sectionsHeader['first_line'] = sectionsHeader.after;

  // Feed game description to generic function
  openSinglePanelPageFromDescription(columnsDescription, sectionsHeader);
}
