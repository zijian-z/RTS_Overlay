import subprocess

from PyQt5.QtWidgets import QMainWindow, QLabel, QPushButton
from PyQt5.QtWidgets import QCheckBox
from PyQt5.QtGui import QFont, QIcon, QPixmap
from PyQt5.QtCore import Qt

from common.useful_tools import set_background_opacity, OverlaySequenceEdit, widget_x_end, widget_y_end
from common.rts_settings import RTSHotkeys, KeyboardMouse, RTSHotkeysConfigurationLayout


class HotkeysWindow(QMainWindow):
    """Window to configure the hotkeys"""

    def __init__(
        self,
        parent,
        hotkeys: RTSHotkeys,
        game_icon: str,
        mouse_image: str,
        configuration_folder: str,
        panel_settings: RTSHotkeysConfigurationLayout,
        timer_flag: bool = False,
    ):
        """Constructor

        Parameters
        ----------
        parent                  Parent window.
        hotkeys                 Hotkeys current definition.
        game_icon               Icon of the game.
        mouse_image             Image for the mouse.
        configuration_folder    Folder with the configuration files (settings and build orders).
        panel_settings          Settings for the panel layout.
        timer_flag              True to add the timer hotkeys.
        """
        super().__init__()
        self.parent = parent

        # panel settings
        self.color_font = panel_settings.color_font
        self.button_margin = panel_settings.button_margin
        self.font_police = panel_settings.font_police
        self.font_size = panel_settings.font_size
        self.border_size = panel_settings.border_size
        self.section_vertical_spacing = panel_settings.section_vertical_spacing
        self.edit_width = panel_settings.edit_width
        self.edit_height = panel_settings.edit_height
        self.vertical_spacing = panel_settings.vertical_spacing
        self.horizontal_spacing = panel_settings.horizontal_spacing
        self.mouse_height = panel_settings.mouse_height
        self.mouse_spacing = panel_settings.mouse_spacing
        self.color_background = panel_settings.color_background
        self.opacity = panel_settings.opacity

        # text for the manual describing how to set up the hotkeys
        manual_text: str = (
            '设置热键组合，或按 Esc 取消。点击“更新热键”确认。'
            '\n\n勾选鼠标复选框后，L 表示左键，R 表示右键，'
            'M 表示中键，\n1 表示第一个侧键，2 表示第二个侧键。'
            '\n因此，勾选鼠标选项时输入 Ctrl+1 表示 Ctrl + 第一个侧键。'
            '\n\n此窗口打开时，热键不会生效。'
        )

        # description for the different hotkeys
        if timer_flag:  # including timer hotkeys
            self.descriptions = {
                'next_panel': '切换到下一面板：',
                'show_hide': '显示/隐藏浮层：',
                'build_order_previous_step': '上一步 / 计时器 -1 秒：',
                'build_order_next_step': '下一步 / 计时器 +1 秒：',
                'switch_timer_manual': '切换计时/手动：',
                'start_timer': '开始计时：',
                'stop_timer': '停止计时：',
                'start_stop_timer': '开始/停止计时：',
                'reset_timer': '重置计时器：',
            }
        else:  # without timer hotkeys
            self.descriptions = {
                'next_panel': '切换到下一面板：',
                'show_hide': '显示/隐藏浮层：',
                'build_order_previous_step': '上一个建造顺序步骤：',
                'build_order_next_step': '下一个建造顺序步骤：',
            }

        for description in self.descriptions:
            assert description in self.parent.hotkey_names

        # style to apply on the different parts
        self.style_description = f'color: rgb({self.color_font[0]}, {self.color_font[1]}, {self.color_font[2]})'
        self.style_sequence_edit = 'QWidget{' + self.style_description + '; border: 1px solid white}'
        self.style_button = (
            'QWidget{'
            + self.style_description
            + '; border: 1px solid white; padding: '
            + str(self.button_margin)
            + 'px}'
        )

        # manual
        manual_label = QLabel(manual_text, self)
        manual_label.setFont(QFont(self.font_police, self.font_size))
        manual_label.setStyleSheet(self.style_description)
        manual_label.adjustSize()
        manual_label.move(self.border_size, self.border_size)
        y_hotkeys = widget_y_end(manual_label) + self.section_vertical_spacing  # vertical position for hotkeys
        max_width = widget_x_end(manual_label)

        # labels display (descriptions)
        count = 0
        y_buttons = y_hotkeys  # vertical position for the buttons
        line_height = self.edit_height + self.vertical_spacing
        first_column_max_width = 0
        for description in self.descriptions.values():
            label = QLabel(description, self)
            label.setFont(QFont(self.font_police, self.font_size))
            label.setStyleSheet(self.style_description)
            label.adjustSize()
            label.move(self.border_size, y_hotkeys + count * line_height)
            first_column_max_width = max(first_column_max_width, widget_x_end(label))
            y_buttons = widget_y_end(label) + self.section_vertical_spacing
            count += 1

        # button to open settings folder
        self.folder_button = QPushButton('打开配置文件夹', self)
        self.folder_button.setFont(QFont(self.font_police, self.font_size))
        self.folder_button.setStyleSheet(self.style_button)
        self.folder_button.adjustSize()
        self.folder_button.move(self.border_size, y_buttons)
        self.folder_button.clicked.connect(lambda: subprocess.run(['explorer', configuration_folder]))
        self.folder_button.show()
        first_column_max_width = max(first_column_max_width, widget_x_end(self.folder_button))

        # mouse dictionaries
        self.mouse_to_field = {'left': 'L', 'middle': 'M', 'right': 'R', 'x1': '1', 'x2': '2'}
        self.field_to_mouse = {v: k for k, v in self.mouse_to_field.items()}

        # hotkeys edit fields
        count = 0
        x_hotkey = first_column_max_width + self.horizontal_spacing  # horizontal position for the hotkey fields
        self.hotkeys = {}  # storing the hotkeys
        self.mouse_checkboxes = {}  # storing the mouse checkboxes
        for key in self.descriptions.keys():
            hotkey = OverlaySequenceEdit(self)

            valid_mouse_input = False  # check if valid mouse input provided
            if hasattr(hotkeys, key):
                value = getattr(hotkeys, key)
                if isinstance(value, KeyboardMouse):
                    valid_mouse_input = value.mouse in self.mouse_to_field
                    if (value.keyboard != '') and valid_mouse_input:
                        hotkey.setKeySequence(value.keyboard + '+' + self.mouse_to_field[value.mouse])
                    elif value.keyboard != '':
                        hotkey.setKeySequence(value.keyboard)
                    elif valid_mouse_input:
                        hotkey.setKeySequence(self.mouse_to_field[value.mouse])

            hotkey.setFont(QFont(self.font_police, self.font_size))
            hotkey.setStyleSheet(self.style_sequence_edit)
            hotkey.resize(self.edit_width, self.edit_height)
            hotkey.move(x_hotkey, y_hotkeys + count * line_height)
            hotkey.setToolTip('点击后编辑，再输入热键组合。')
            hotkey.show()
            self.hotkeys[key] = hotkey

            # icon for the mouse
            mouse_icon = QLabel('', self)
            mouse_icon.setPixmap(QPixmap(mouse_image).scaledToHeight(self.mouse_height, mode=Qt.SmoothTransformation))
            mouse_icon.adjustSize()
            mouse_icon.move(widget_x_end(hotkey) + self.mouse_spacing, hotkey.y())
            mouse_icon.show()

            # checkbox for the mouse
            mouse_checkbox = QCheckBox('', self)
            mouse_checkbox.setChecked(valid_mouse_input)
            mouse_checkbox.adjustSize()
            mouse_checkbox.move(widget_x_end(mouse_icon) + self.horizontal_spacing, hotkey.y())
            mouse_checkbox.show()
            max_width = max(max_width, widget_x_end(mouse_checkbox))
            self.mouse_checkboxes[key] = mouse_checkbox

            count += 1

        # send update button
        self.update_button = QPushButton('更新热键', self)
        self.update_button.setFont(QFont(self.font_police, self.font_size))
        self.update_button.setStyleSheet(self.style_button)
        self.update_button.adjustSize()
        self.update_button.move(x_hotkey, self.folder_button.y())
        self.update_button.clicked.connect(self.parent.update_hotkeys)
        self.update_button.show()
        max_width = max(max_width, widget_x_end(self.update_button))

        # window properties and show
        self.setWindowTitle('配置')
        self.setWindowIcon(QIcon(game_icon))
        if panel_settings.stay_on_top:
            self.setWindowFlags(Qt.WindowStaysOnTopHint)  # window staying on top
        self.resize(max_width + self.border_size, widget_y_end(self.update_button) + self.border_size)
        set_background_opacity(self, self.color_background, self.opacity)
        self.show()

    def closeEvent(self, _):
        """Called when clicking on the cross icon (closing window icon)."""
        self.parent.keyboard_mouse.set_all_flags(False)
        super().close()
