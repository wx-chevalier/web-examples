import { Platform, PixelRatio } from "react-native";

// import pickerTheme from "./Picker";
import variable from "./../variables/platform";

export default (variables = variable) => {
	const platform = variables.platform;

	const listItemTheme = {
		"NativeBase.InputGroup": {
			"NativeBase.Icon": {
				paddingRight: 5,
			},
			"NativeBase.IconNB": {
				paddingRight: 5,
			},
			"NativeBase.Input": {
				paddingHorizontal: 5,
			},
			flex: 1,
			borderWidth: undefined,
			margin: -10,
			borderBottomColor: "transparent",
		},
		".searchBar": {
			"NativeBase.Item": {
				"NativeBase.Icon": {
					backgroundColor: "transparent",
					color: variables.dropdownLinkColor,
					fontSize: platform === "ios" ? variables.iconFontSize - 10 : variables.iconFontSize - 5,
					alignItems: "center",
					marginTop: 2,
					paddingRight: 8,
				},
				"NativeBase.IconNB": {
					backgroundColor: "transparent",
					color: undefined,
					alignSelf: "center",
				},
				"NativeBase.Input": {
					alignSelf: "center",
				},
				alignSelf: "center",
				alignItems: "center",
				justifyContent: "flex-start",
				flex: 1,
				height: platform === "ios" ? 30 : 40,
				borderColor: "transparent",
				backgroundColor: "#fff",
				borderRadius: 5,
			},
			"NativeBase.Button": {
				".transparent": {
					"NativeBase.Text": {
						fontWeight: "500",
					},
					paddingHorizontal: undefined,
					paddingLeft: platform === "ios" ? 10 : undefined,
				},
				paddingHorizontal: platform === "ios" ? undefined : undefined,
				width: platform === "ios" ? undefined : 0,
				height: platform === "ios" ? undefined : 0,
			},
			backgroundColor: variables.toolbarInputColor,
			padding: 10,
			marginLeft: undefined,
		},
		"NativeBase.CheckBox": {
			marginLeft: -10,
			marginRight: 10,
		},
		".first": {
			".itemHeader": {
				paddingTop: variables.listItemPadding + 3,
			},
		},
		".itemHeader": {
			".first": {
				paddingTop: variables.listItemPadding + 3,
			},
			borderBottomWidth: platform === "ios" ? variables.borderWidth : undefined,
			marginLeft: undefined,
			padding: variables.listItemPadding,
			paddingLeft: variables.listItemPadding + 5,
			paddingTop: platform === "ios" ? variables.listItemPadding + 25 : undefined,
			paddingBottom: platform === "android" ? variables.listItemPadding + 20 : undefined,
			flexDirection: "row",
			borderColor: variables.listBorderColor,
			"NativeBase.Text": {
				fontSize: 14,
				color: platform === "ios" ? undefined : variables.listNoteColor,
			},
		},
		".itemDivider": {
			borderBottomWidth: undefined,
			marginLeft: undefined,
			padding: variables.listItemPadding,
			paddingLeft: variables.listItemPadding + 5,
			backgroundColor: variables.listDividerBg,
			flexDirection: "row",
			borderColor: variables.listBorderColor,
		},
		".selected": {
			"NativeBase.Left": {
				"NativeBase.Text": {
					color: variables.brandPrimary,
				},
			},
			"NativeBase.Text": {
				color: variables.brandPrimary,
			},
		},
		"NativeBase.Left": {
			"NativeBase.Body": {
				"NativeBase.Text": {
					".note": {
						color: variables.listNoteColor,
						fontWeight: "200",
					},
					fontWeight: "600",
				},
				marginLeft: 10,
				alignItems: undefined,
				alignSelf: undefined,
			},
			"NativeBase.Icon": {
				width: variables.iconFontSize - 10,
				fontSize: variables.iconFontSize - 10,
			},
			"NativeBase.IconNB": {
				width: variables.iconFontSize - 10,
				fontSize: variables.iconFontSize - 10,
			},
			"NativeBase.Text": {
				marginLeft: 10,
				alignSelf: "center",
			},
			flexDirection: "row",
		},
		"NativeBase.Body": {
			"NativeBase.Text": {
				marginHorizontal: variables.listItemPadding,
				".note": {
					color: variables.listNoteColor,
					fontWeight: "200",
				},
			},
			alignSelf: undefined,
			alignItems: undefined,
		},
		"NativeBase.Right": {
			"NativeBase.Badge": {
				alignSelf: undefined,
			},
			"NativeBase.PickerNB": {
				"NativeBase.Button": {
					marginRight: -15,
					"NativeBase.Text": {
						color: variables.topTabBarActiveTextColor,
					},
				},
			},
			"NativeBase.Button": {
				alignSelf: undefined,
				".transparent": {
					"NativeBase.Text": {
						color: variables.topTabBarActiveTextColor,
					},
				},
			},
			"NativeBase.Icon": {
				alignSelf: undefined,
				fontSize: variables.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"NativeBase.IconNB": {
				alignSelf: undefined,
				fontSize: variables.iconFontSize - 8,
				color: "#c9c8cd",
			},
			"NativeBase.Text": {
				".note": {
					color: variables.listNoteColor,
					fontWeight: "200",
				},
				alignSelf: undefined,
			},
			"NativeBase.Thumbnail": {
				alignSelf: undefined,
			},
			"NativeBase.Image": {
				alignSelf: undefined,
			},
			"NativeBase.Radio": {
				alignSelf: undefined,
			},
			"NativeBase.Checkbox": {
				alignSelf: undefined,
			},
			"NativeBase.Switch": {
				alignSelf: undefined,
			},
			padding: undefined,
			flex: 0.28,
		},
		"NativeBase.Text": {
			".note": {
				color: variables.listNoteColor,
				fontWeight: "200",
			},
			alignSelf: "center",
		},

		".last": {
			marginLeft: -(variables.listItemPadding + 5),
			paddingLeft: (variables.listItemPadding + 5) * 2,
			top: 1,
		},

		".avatar": {
			"NativeBase.Left": {
				flex: 0,
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: undefined,
				},
				flex: 1,
				paddingVertical: variables.listItemPadding,
				borderBottomWidth: variables.borderWidth,
				borderColor: variables.listBorderColor,
				marginLeft: variables.listItemPadding + 5,
			},
			"NativeBase.Right": {
				"NativeBase.Text": {
					".note": {
						fontSize: variables.noteFontSize - 2,
					},
				},
				flex: 0,
				paddingRight: variables.listItemPadding + 5,
				alignSelf: "stretch",
				paddingVertical: variables.listItemPadding,
				borderBottomWidth: variables.borderWidth,
				borderColor: variables.listBorderColor,
			},
			borderBottomWidth: undefined,
			paddingVertical: undefined,
			paddingRight: undefined,
		},

		".thumbnail": {
			"NativeBase.Left": {
				flex: 0,
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: undefined,
				},
				flex: 1,
				paddingVertical: variables.listItemPadding + 5,
				borderBottomWidth: variables.borderWidth,
				borderColor: variables.listBorderColor,
				marginLeft: variables.listItemPadding + 5,
			},
			"NativeBase.Right": {
				"NativeBase.Button": {
					".transparent": {
						"NativeBase.Text": {
							fontSize: variables.listNoteSize,
							color: variables.sTabBarActiveTextColor,
						},
					},
					height: undefined,
				},
				flex: 0,
				justifyContent: "center",
				alignSelf: "stretch",
				paddingRight: variables.listItemPadding + 5,
				paddingVertical: variables.listItemPadding + 5,
				borderBottomWidth: variables.borderWidth,
				borderColor: variables.listBorderColor,
			},
			borderBottomWidth: undefined,
			paddingVertical: undefined,
			paddingRight: undefined,
		},

		".icon": {
			".last": {
				"NativeBase.Body": {
					borderBottomWidth: undefined,
				},
				"NativeBase.Right": {
					borderBottomWidth: undefined,
				},
				borderBottomWidth: variables.borderWidth,
				borderColor: variables.listBorderColor,
			},
			"NativeBase.Left": {
				"NativeBase.Button": {
					"NativeBase.IconNB": {
						marginHorizontal: undefined,
						fontSize: variables.iconFontSize - 5,
					},
					"NativeBase.Icon": {
						marginHorizontal: undefined,
						fontSize: variables.iconFontSize - 8,
					},
					alignSelf: "center",
					height: 29,
					width: 29,
					borderRadius: 6,
					paddingVertical: undefined,
					paddingHorizontal: undefined,
					alignItems: "center",
					justifyContent: "center",
				},
				"NativeBase.Icon": {
					width: variables.iconFontSize - 5,
					fontSize: variables.iconFontSize - 2,
				},
				"NativeBase.IconNB": {
					width: variables.iconFontSize - 5,
					fontSize: variables.iconFontSize - 2,
				},
				paddingRight: variables.listItemPadding + 5,
				flex: 0,
				height: 44,
				justifyContent: "center",
				alignItems: "center",
			},
			"NativeBase.Body": {
				"NativeBase.Text": {
					marginLeft: undefined,
					fontSize: 17,
				},
				flex: 1,
				height: 44,
				justifyContent: "center",
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: variables.listBorderColor,
			},
			"NativeBase.Right": {
				"NativeBase.Text": {
					textAlign: "center",
					color: "#8F8E95",
					fontSize: 17,
				},
				"NativeBase.IconNB": {
					color: "#C8C7CC",
					fontSize: variables.iconFontSize - 10,
					alignSelf: "center",
					paddingLeft: 10,
					paddingTop: 3,
				},
				"NativeBase.Icon": {
					color: "#C8C7CC",
					fontSize: variables.iconFontSize - 10,
					alignSelf: "center",
					paddingLeft: 10,
					paddingTop: 3,
				},
				"NativeBase.Switch": {
					marginRight: Platform.OS === "ios" ? undefined : -5,
					alignSelf: undefined,
				},
				// "NativeBase.PickerNB": {
				// 	...pickerTheme(),
				// },
				flexDirection: "row",
				alignItems: "center",
				flex: 0,
				alignSelf: "stretch",
				height: 44,
				justifyContent: "flex-end",
				borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
				borderColor: variables.listBorderColor,
				paddingRight: variables.listItemPadding + 5,
			},
			borderBottomWidth: undefined,
			paddingVertical: undefined,
			paddingRight: undefined,
			height: 44,
			justifyContent: "center",
		},
		".noBorder": {
			borderBottomWidth: undefined,
		},
		alignItems: "center",
		flexDirection: "row",
		paddingRight: variables.listItemPadding + 5,
		paddingVertical: variables.listItemPadding + 3,
		marginLeft: variables.listItemPadding + 5,
		borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
		// backgroundColor: variables.listBg,
		borderColor: variables.listBorderColor,
	};

	return listItemTheme;
};
