介绍
============
**RTS 浮层**（RTS Overlay）用于为即时战略（RTS）游戏设计或导入建造顺序。
建造顺序可以显示在游戏之上，因此单显示器也能使用。

游戏中切换建造顺序步骤需要手动操作，可通过按钮、热键或计时器完成。
RTS 浮层不会与游戏交互（不分析画面，也不操控游戏）。

使用方法见下方[主要说明与下载](#主要说明与下载)。

![RTS Overlay](/docs/assets/common/icon/salamander_sword_shield_small.webp)


目录
=================

* [主要说明与下载](#主要说明与下载)
* [通过浏览器或 EXE 使用浮层](#通过浏览器或-exe-使用浮层)
* [支持的游戏](#支持的游戏)
* [网页版](#网页版)
    * [始终置顶](#始终置顶)
* [EXE / Python 版](#exe--python-版)
    * [EXE 版](#exe-版)
    * [Python 配置](#python-配置)
    * [配置面板](#配置面板)
    * [选择建造顺序](#选择建造顺序)
* [网页版与 EXE / Python 版的共同说明](#网页版与-exe--python-版的共同说明)
    * [设计建造顺序](#设计建造顺序)
    * [使用建造顺序面板](#使用建造顺序面板)
* [各游戏说明](#各游戏说明)
    * [帝国时代II（AoE2）](#帝国时代iiaoe2)
    * [帝国时代IV（AoE4）](#帝国时代ivaoe4)
    * [神话时代（AoM）](#神话时代aom)
    * [星际争霸2（SC2）](#星际争霸2sc2)
    * [魔兽争霸3（WC3）](#魔兽争霸3wc3)
* [故障排除](#故障排除)
    * [网页版](#网页版-1)
    * [EXE / Python 版](#exe--python-版-1)
* [其他说明](#其他说明)


# 主要说明与下载

如下一节[通过浏览器或 EXE 使用浮层](#通过浏览器或-exe-使用浮层)所述，有两种使用方式：
* 通过浏览器
    * [YouTube 演示](https://youtu.be/dst2b8b4_fo)
    * 打开 [rts-overlay.github.io](https://rts-overlay.github.io/) 并按页面说明操作。
* 使用 EXE（或从 Python 源代码运行）
    * [YouTube 演示](https://youtu.be/qFBkpTnRzWQ)
    * 下载 EXE（仅 Windows）：
        * [帝国时代II](https://github.com/CraftySalamander/RTS_Overlay/releases/download/2.15.0/aoe2_overlay.zip)
        * [帝国时代IV](https://github.com/CraftySalamander/RTS_Overlay/releases/download/2.14.0/aoe4_overlay.zip)
        * [神话时代](https://github.com/CraftySalamander/RTS_Overlay/releases/download/2.12.0/aom_overlay.zip)
        * [星际争霸2](https://github.com/CraftySalamander/RTS_Overlay/releases/download/2.12.0/sc2_overlay.zip)
        * [魔兽争霸3](https://github.com/CraftySalamander/RTS_Overlay/releases/download/2.12.0/wc3_overlay.zip)
    * 也可以按[Python 配置](#python-配置)从源代码运行。


# 通过浏览器或 EXE 使用浮层

RTS 浮层可以通过[浏览器](https://rts-overlay.github.io/)使用，也可以使用 EXE / Python 版（EXE 可从[这里](#主要说明与下载)下载预编译包，或从 Python 源代码运行）。

网页版更容易上手，适合第一次试用 *RTS 浮层*。
EXE / Python 版（源代码或预编译）额外提供：
1. *更不打扰*：没有标题栏，可半透明，并且不会挡住鼠标点击。
2. *全局热键*：两个版本都支持热键，但网页版只有焦点在浮层上时才接受热键。EXE / Python 版即使焦点在游戏上也会监听热键。

如何运行：
* **网页版**：打开 [rts-overlay.github.io](https://rts-overlay.github.io/) 并按说明操作。
    * 有两种模式：“画中画”（应自动把浮层保持在游戏之上）和“经典窗口”。在“经典窗口”模式下若要保持在游戏之上，请使用*始终置顶*程序。Windows 上可以使用 [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/)。它免费，由微软开发，可在 [Microsoft Store](https://apps.microsoft.com/) 获取。
    * 也可以下载本地版本，以加快速度、离线使用并自定义体验。[点击这里](https://github.com/CraftySalamander/RTS_Overlay/archive/refs/heads/master.zip)，解压后用任意浏览器打开 *docs/index.html*。也可以点击地址栏中的安装按钮（Chrome 和 Edge）在本地安装。
    * 开发版（非稳定）在[这里](https://craftysalamander.github.io/RTS_Overlay/)。
* **EXE / Python 版**：在[这里](#主要说明与下载)下载 EXE，或按[这里](#python-配置)的 Python 说明操作。
    * EXE 是预编译版本（由 Python 源代码得到），连同依赖一起打成 zip。不需要安装 Python 环境，解压后点击对应游戏的 EXE（位于 *overlay* 子文件夹）。部分杀毒软件会拦截从网上解压出来的 EXE，若使用此方案可能需要添加例外。


# 支持的游戏

目前支持以下游戏：

* [帝国时代II：决定版](https://www.ageofempires.com/games/aoeiide/)
    * 可从 [buildorderguide.com](https://www.buildorderguide.com) 下载建造顺序（点击 *Export for RTS*），或从 [RTS Builds](https://craftysalamander.github.io/rtsbuilds/?gameId=aoe2) 下载（点击 *Open in RTS Overlay*）。
    * YouTube 演示：[网页版](https://youtu.be/tONaR2oOt3I)或 [EXE / Python 版](https://youtu.be/qFBkpTnRzWQ)。

[![帝国时代II 建造顺序演示](/readme/aoe2_build_order_demo.webp)](https://youtu.be/tONaR2oOt3I)

* [帝国时代IV](https://www.ageofempires.com/games/age-of-empires-iv/)
    * 可从 [aoe4guides.com](https://aoe4guides.com) 或 [RTS Builds](https://craftysalamander.github.io/rtsbuilds/?gameId=aoe4) 下载建造顺序（点击 *Open in RTS Overlay*）。[age4builder.com](https://age4builder.com) 也曾提供 RTS 浮层格式的建造顺序，但该项目似乎已停止。
    * YouTube 演示在[这里](https://youtu.be/RmsofE58YEg)。

[![帝国时代IV 建造顺序演示](/readme/aoe4_build_order_demo.webp)](https://youtu.be/RmsofE58YEg)

* [神话时代](https://www.ageofempires.com/games/aom/age-of-mythology-retold/)
    * 可从 [RTS Builds](https://craftysalamander.github.io/rtsbuilds/?gameId=aom) 下载建造顺序（点击 *Open in RTS Overlay*）。[thedodclan.com](https://thedodclan.com/) 曾提供导出到 RTS 浮层的功能，但网站改版后取消了该功能。
    * YouTube 演示在[这里](https://youtu.be/f11ISkuVhnU)。

[![神话时代建造顺序演示](/readme/aom_build_order_demo.webp)](https://youtu.be/f11ISkuVhnU)

* [星际争霸2](https://starcraft2.com)

![星际争霸2 建造顺序演示](/readme/sc2_build_order_demo.webp)

* [魔兽争霸3](https://warcraft3.blizzard.com/)


# 网页版

[网页版](https://rts-overlay.github.io/)的主页面如下。
把鼠标悬停在页面右上角的 “i” 图标上可查看完整说明。

![RTS 浮层网页版](/readme/rts_overlay_web.webp)

## 始终置顶

建造顺序准备好后，点击*显示浮层*按钮，会生成一个包含该建造顺序的新小窗口。

在“经典窗口”模式下，请使用*始终置顶*程序让它保持在游戏之上（“画中画”模式不需要）。

[Microsoft PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) 是一个合适的选择。它免费，由微软开发，可在 *Microsoft Store* 获取。
从 *Microsoft Store* 下载后，为*始终置顶*功能设置热键（也可以设置边框颜色），并对 *RTS 浮层* 窗口使用该功能。

# EXE / Python 版

在下面两种方式中选择一种（*EXE 版*或 *Python 配置*）。如上所述，相比网页版有两点好处：*更不打扰*和*全局热键*。

## EXE 版

这种方式更简单，运行的是编译后的版本（因此更高效）。
Python 代码已连同全部依赖编译并打包成 zip。
部分杀毒软件不喜欢从网上解压出来、包含可执行文件和依赖的 zip，可能会给出误报。
步骤如下：

1. 在[这里](#主要说明与下载)下载对应游戏的 zip。在部分电脑上，解压前需要先解除 zip 的锁定（右键 zip，选择属性，然后选择“解除锁定”）。
2. 解压到电脑上的任意位置（最好放在不需要特殊权限的位置）。
3. 启动对应游戏的可执行文件即可（这些可执行文件都在 *overlay* 子文件夹中，各游戏的具体文件名见下方说明）。

要更新到新版本，删除旧文件夹并用新版本替换即可。
设置和建造顺序保存在用户数据目录（例如 *C:\Users\XXXXX\AppData\Local\RTS_Overlay*）。因此更新版本不应删除旧设置或建造顺序。
若要使用本地配置文件夹，在 *overlay* 子文件夹中创建一个名为 *"local_config"* 的文件夹。配置和建造顺序会保存在那里。

如果遇到问题，请查看[故障排除](#故障排除)。

## Python 配置

可以用 Python 从源代码运行。即使没有编程经验也不难。
步骤如下：

1. 如果还没有 Python 环境，可以用 [Anaconda 安装程序](https://www.anaconda.com/download) 下载并安装带 conda 包管理器的 Python 发行版（其他发行版也可以，例如 [Miniforge](https://github.com/conda-forge/miniforge#miniforge3)）。
可选：把该程序（例如 Anaconda3）加入 PATH 环境变量，以便从任意终端运行。
2. 下载 RTS 浮层代码：点击[本页](https://github.com/CraftySalamander/RTS_Overlay)顶部的 *Code*，再点击 *Download ZIP* 并解压（或用 [Git](https://git-scm.com/) 克隆）。
3. 打开 *Anaconda Prompt*。如果已把 Python 路径加入 PATH，可以打开任意终端（例如 Windows 的*命令提示符*）。
4. 进入解压文件夹中的 python 目录（例如 `cd RTS_Overlay-master/python`）。
5. 创建 Conda 环境：`conda create --name rts_overlay python=3.8`
6. 激活环境：`conda activate rts_overlay`
7. 安装依赖：`pip install -r utilities/requirements.txt`
8. 可选：运行 `pip install python-Levenshtein==0.12.2`（略微加快速度）。
9. 运行程序：`python main_aoe2.py`（帝国时代II；其他游戏把文件名换成对应的 `main_*.py`）。

每次启动程序都需要重新执行第 3、4、6、9 步。

若要把程序做成 *exe*，在 `cd utilities` 之后运行 `python prepare_release.py`，会生成独立库并准备发布所需的其他文件（需要 `pip install nuitka==1.0.6` 和 `pip install orderedset==2.0.3`）。


## 配置面板

启动 *RTS 浮层* 的 EXE / Python 版后，首先看到的是*配置面板*。
它用于配置布局和建造顺序。

![配置面板](/readme/aoe2_panel_configuration.webp)

第一行从左到右是这些操作按钮：

* [退出程序](docs/assets/common/action_button/leave.webp)：退出工具。
* [保存设置](docs/assets/common/action_button/save.webp)：把配置保存到设置文件（例如 *aoe2_settings.json*）。
* [加载设置](docs/assets/common/action_button/load.webp)：加载上述文件中的设置（启动时会自动加载）。
* [配置](docs/assets/common/action_button/gears.webp)：配置热键（键盘和/或鼠标），并打开保存配置文件的文件夹。该文件夹同时包含设置和建造顺序。要添加建造顺序，取得其 JSON 文件（来自 [craftysalamander.github.io/rtsbuilds](https://craftysalamander.github.io/rtsbuilds)、第三方网站，或在 [rts-overlay.github.io](https://rts-overlay.github.io) 上设计），并放到该配置文件夹的 `build_orders` 子文件夹中。帝国时代II 的这个子文件夹通常是 *C:\Users\XXXXX\AppData\Local\RTS_Overlay\aoe2\build_orders*。
* [添加/编辑建造顺序](docs/assets/common/action_button/feather.webp)：通过粘贴建造顺序文本来添加，或打开建造顺序文件夹手动删除。
* 选择文字的字体大小。
* 选择布局缩放（图片、间距等）。
    * 使用 4K 显示器时，例如可以把该值设为 *200 %*。
* [下一面板](docs/assets/common/action_button/to_end.webp)：进入下一面板（在*配置*和*建造顺序*之间循环）。

以下热键是全局的，即使焦点不在浮层上（通常是正在玩游戏时）也可以使用：
* *next_panel*：切换到下一面板
* *show_hide*：显示或隐藏程序
* *build_order_previous_step*：到上一个建造顺序步骤，或把计时器减 1 秒（见下文）
* *build_order_next_step*：到下一个建造顺序步骤，或把计时器加 1 秒（见下文）
* *switch_timer_manual*：在手动和计时之间切换（见下文）
* *start_timer*：开始计时
* *stop_timer*：停止计时
* *start_stop_timer*：开始或停止计时
* *reset_timer*：把计时器重置为 *0:00*

可以用鼠标左键拖动窗口。窗口会随内容改变大小，因此真正重要的是右上角位置。这个右上角位置会被保持，并用[保存设置](docs/assets/common/action_button/save.webp)按钮写入设置文件。

浮层窗口应保持在其他程序（包括游戏）之上。有时启动时可能不生效，点击一次[下一面板](docs/assets/common/action_button/to_end.webp)通常可以解决。

设置文件中还有更多选项（字体、图片大小等）。点击[配置](docs/assets/common/action_button/gears.webp)，再点击“打开配置文件夹”即可找到它。可以用任意文本编辑器编辑（JSON 格式），然后重新加载（使用[加载设置](docs/assets/common/action_button/load.webp)按钮，或退出后重新启动）。

## 选择建造顺序

在配置面板中有**建造顺序**搜索栏。要选择要显示的建造顺序，先输入几个关键词。最多会列出 10 个对应的建造顺序。搜索使用模糊匹配。也可以在上述设置文件（JSON）中用 `bo_list_fuzz_search` 关闭或调整模糊搜索。设为 False 时，用空格分开的每个关键词都必须出现在建造顺序名称中。如果只输入一个空格，会列出前 10 个建造顺序。浮层可以按阵营筛选，选择自己的阵营或通用建造顺序（以及对手阵营，若该游戏支持）。

按 *Enter* 选择以粗体显示的建造顺序。默认选中列表中的第一项，可以用 *Tab* 改选另一项。也可以用鼠标点击所需的建造顺序。


# 网页版与 EXE / Python 版的共同说明

## 设计建造顺序

如果有专门网站能输出正确格式，用网站设计建造顺序最方便（例如帝国时代II 的 [buildorderguide.com](https://www.buildorderguide.com)）。这些网站上已有很多现成的建造顺序。

也可以在[网页版](https://rts-overlay.github.io/)中点击**自行设计**，在设计面板里编写（演示见[这里](https://youtu.be/dst2b8b4_fo)）。EXE / Python 版则使用[添加/编辑建造顺序按钮](docs/assets/common/action_button/feather.webp)。
两个版本生成的建造顺序格式相同（网页版与 EXE / Python 版）。

![设计建造顺序](/readme/rts_overlay_aoe2_editor.gif)

## 使用建造顺序面板

在 EXE / Python 版中，不能点击这个窗口（因此仍可以点击它后面的游戏），第一行的按钮除外。网页版没有这个特性（鼠标操作不会穿透窗口）。

可以用两个[箭头按钮](docs/assets/common/action_button/previous.webp)选择建造顺序的步骤。当前步骤显示在按钮旁边。即使焦点不在浮层上，也可以用上面的热键切换步骤。

如果计时功能可用且与当前建造顺序兼容，会出现[羽毛/沙漏按钮](docs/assets/common/action_button/manual_timer_switch.webp)。点击后，建造顺序会按时间推进。要停止或继续，点击[对应按钮](docs/assets/common/action_button/start_stop.webp)。此时[箭头按钮](docs/assets/common/action_button/previous.webp)改为把计时器增减 1 秒，带 *0:00* 的[重置按钮](docs/assets/common/action_button/timer_0.webp)会把计时器归零。运行时，当前指令会高亮，上一条和下一条也会显示。这些操作都有热键。

建造顺序通常会标出各资源应分配的工人数、工人/人口总数，以及一些备注。
适用时还会标出要进入的时代、时间和/或建造者数量。

![建造顺序面板](/readme/aoe2_panel_build_order.webp)


# 各游戏说明

## 帝国时代II（AoE2）

运行时，在网页版中选择帝国时代II，或启动 *aoe2_overlay.exe*（在[这里](#主要说明与下载)下载，或按[Python 配置](#python-配置)从源代码运行）。


## 帝国时代IV（AoE4）

运行时，在网页版中选择帝国时代IV，或启动 *aoe4_overlay.exe*（在[这里](#主要说明与下载)下载，或按[Python 配置](#python-配置)从源代码运行）。


## 神话时代（AoM）

运行时，在网页版中选择神话时代，或启动 *aom_overlay.exe*（在[这里](#主要说明与下载)下载，或按[Python 配置](#python-配置)从源代码运行）。


## 星际争霸2（SC2）

运行时，在网页版中选择星际争霸2，或启动 *sc2_overlay.exe*（在[这里](#主要说明与下载)下载，或按[Python 配置](#python-配置)从源代码运行）。


## 魔兽争霸3（WC3）

运行时，在网页版中选择魔兽争霸3，或启动 *wc3_overlay.exe*（在[这里](#主要说明与下载)下载，或按[Python 配置](#python-配置)从源代码运行）。


# 故障排除

遇到问题时，先尝试下面的办法。如果都不能解决，可以在 GitHub 上提交 issue（https://github.com/CraftySalamander/RTS_Overlay/issues），并尽量详细描述问题。
使用 EXE / Python 版时，请写明版本号（位于文件夹根目录的 *version.json*）。

## 网页版

如果网页版出现问题，可以换一个浏览器（Chrome、Edge 等）再试，看问题是否仍然存在。对这个浮层来说，Edge 和 Chrome 通常比 Firefox 等浏览器更合适。

## EXE / Python 版

在部分电脑上，可能需要允许访问可执行文件或整个文件夹。特别是如果看到 “cannot proceed because python38.dll was not found”，必须在解压前解除 zip 的锁定（右键 zip，选择属性，然后选择“解除锁定”）。

同样，Windows（或杀毒软件）可能把 *.exe* 当作威胁并删除。可能需要为 Defender 添加例外。

如果程序已启动（任务栏能看到图标）但窗口不可见，可能是浮层出现在屏幕之外（例如曾经使用多显示器，后来拔掉了其中一个）。请检查设置是否正确（文件多半位于 *C:\Users\xxx\AppData\Local\RTS_Overlay\xxx\settings\xxx_settings.json*）。例如，浮层上角的位置保存在 `layout > upper_right_position`（当 `overlay_on_right_side` 为 `True` 时）和 `layout > upper_left_position`（当 `overlay_on_right_side` 为 `False` 时）。

在 Linux 上，如果浮层不能保持在其他程序之上，在 Gnome 中对非 GTK 程序按 `Alt+Space` 打开标题栏菜单，然后选择 “Always on top”。
已在使用 X11 的 Linux 上测试通过。

如果上述办法不够，可以尝试从源代码用 Python 运行。
步骤见[Python 配置](#python-配置)（即使不懂 Python 也不难）。


# 其他说明
**RTS 浮层**与上述游戏的开发商/发行商没有关联。

对于暴雪-微软的游戏，**RTS 浮层**是根据微软的 “[Game Content Usage Rules](https://www.xbox.com/en-us/developers/rules)” 使用相应游戏素材创建的，并未得到微软的认可或与微软有关联。
