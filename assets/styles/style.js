import { StyleSheet, Platform } from "react-native";
import { color } from "../colors/theme";
import { Card } from "react-native-paper";

export const globalStyles = StyleSheet.create({
  container: {
    padding: 12,
  },
  flex: {
    flex: 1,
  },

  // color ----------- start
  primary: {
    color: color.primary,
  },
  secondaryOrange: {
    color: color.secondary,
  },
  success: {
    color: color.success,
  },
  accent: {
    color: color.accent,
  },
  fontcolor: {
    color: color.fontcolor,
  },
  white: {
    color: color.white,
  },
  lightTurquoise: {
    color: color.lightTurquoise,
  },
  lightBlue: {
    color: color.lightBlue,
  },
  lightPink: {
    color: color.lightPink,
  },
  navyBlue: {
    color: color.navyBlue,
  },
  neutral100: {
    color: color.neutral[100],
  },
  neutral200: {
    color: color.neutral[200],
  },
  neutral300: {
    color: color.neutral[300],
  },
  neutral500: {
    color: color.neutral[500],
  },
  neutralDark: {
    color: "#767676",
  },
  red: {
    color: "#e50000",
  },

  // color ----------- end

  // background color ----------- start
  bgprimary: {
    backgroundColor: color.primary,
  },
  bgsecondaryOrange: {
    backgroundColor: color.secondary,
  },
  bgsuccess: {
    backgroundColor: color.success,
  },
  bgaccent: {
    backgroundColor: color.accent,
  },
  bgfontcolor: {
    backgroundColor: color.fontcolor,
  },
  bgblack: {
    backgroundColor: color.black,
  },
  bgwhite: {
    backgroundColor: color.white,
  },
  bglightTurquoise: {
    backgroundColor: color.lightTurquoise,
  },
  bglightBlue: {
    backgroundColor: color.lightBlue,
  },
  bglightPink: {
    backgroundColor: color.lightPink,
  },
  bgneutral100: {
    backgroundColor: color.neutral[100],
  },
  bgneutral200: {
    backgroundColor: color.neutral[200],
  },
  bgneutral300: {
    backgroundColor: color.neutral[300],
  },
  bgneutral500: {
    backgroundColor: color.neutral[500],
  },

  // background color .............. end

  // bordercolor ----------- start
  bordercolorprimary: {
    borderColor: color.primary,
  },
  // bordercolor  ............ end

  // borderWidth ----------- start
  borderWidth3: {
    borderWidth: 3,
  },
  // borderWidth  ......... end

  // margins and paddings ----------- start
  // Margins
  m0: { margin: 0 },
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  m5: { margin: 20 },
  // Top margins
  mtn50: { marginTop: -50 },
  mtn1: { marginTop: -4 },
  mt0: { marginTop: 0 },
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  mt5: { marginTop: 20 },
  mt50: { marginTop: 50 },
  mt48: { marginTop: 48 },
  // Bottom margins
  mbn0: { marginBottom: -4 },
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb5: { marginBottom: 20 },
  mb6: { marginBottom: 24 },
  mb50: { marginBottom: 50 },
  mb100: { marginBottom: 100 },
  mb120: { marginBottom: 120 },
  mb150: { marginBottom: 150 },
  mb180: { marginBottom: 180 },
  mb300: { marginBottom: 300 },

  // Left margins
  ml0: { marginLeft: 0 },
  ml1: { marginLeft: 4 },
  ml2: { marginLeft: 8 },
  ml3: { marginLeft: 12 },
  ml4: { marginLeft: 16 },
  ml5: { marginLeft: 20 },
  // Right margins
  mr0: { marginRight: 0 },
  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },
  mr5: { marginRight: 20 },
  // Horizontal margins
  mh0: { marginHorizontal: 0 },
  mh1: { marginHorizontal: 4 },
  mh2: { marginHorizontal: 8 },
  mh3: { marginHorizontal: 12 },
  mh4: { marginHorizontal: 16 },
  mh5: { marginHorizontal: 20 },
  // Vertical margins
  mv0: { marginVertical: 0 },
  mv1: { marginVertical: 4 },
  mv2: { marginVertical: 8 },
  mv3: { marginVertical: 12 },
  mv4: { marginVertical: 16 },
  mv5: { marginVertical: 20 },
  mv6: { marginVertical: 24 },

  // Paddings
  p0: { padding: 0 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 20 },
  p40: { padding: 40 },
  // Top paddings
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: 4 },
  pt2: { paddingTop: 8 },
  pt3: { paddingTop: 12 },
  pt4: { paddingTop: 16 },
  pt5: { paddingTop: 20 },
  pt50: { paddingTop: 50 },
  pt48: { paddingTop: 48 },

  // Bottom paddings
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: 4 },
  pb2: { paddingBottom: 8 },
  pb3: { paddingBottom: 12 },
  pb4: { paddingBottom: 16 },
  pb5: { paddingBottom: 20 },
  pb100: { paddingBottom: 100 },
  pb120: { paddingBottom: 120 },

  pb300: { paddingBottom: 400 },
  // Left paddings
  pl0: { paddingLeft: 0 },
  pl1: { paddingLeft: 4 },
  pl2: { paddingLeft: 8 },
  pl3: { paddingLeft: 12 },
  pl4: { paddingLeft: 16 },
  pl5: { paddingLeft: 20 },
  // Right paddings
  pr0: { paddingRight: 0 },
  pr1: { paddingRight: 4 },
  pr2: { paddingRight: 8 },
  pr3: { paddingRight: 12 },
  pr4: { paddingRight: 16 },
  pr5: { paddingRight: 20 },
  // Horizontal paddings
  ph0: { paddingHorizontal: 0 },
  ph1: { paddingHorizontal: 4 },
  ph2: { paddingHorizontal: 8 },
  ph3: { paddingHorizontal: 12 },
  ph4: { paddingHorizontal: 16 },
  ph5: { paddingHorizontal: 20 },
  // Vertical paddings
  pv0: { paddingVertical: 0 },
  pv1: { paddingVertical: 4 },
  pv2: { paddingVertical: 8 },
  pv3: { paddingVertical: 12 },
  pv4: { paddingVertical: 16 },
  pv5: { paddingVertical: 20 },
  // margins and paddings .............. end

  // fontSize  ----------- start
  f1: { fontSize: 8 },
  f2: { fontSize: 10 },
  f3: { fontSize: 16 },
  f18: { fontSize: 18 },
  f4: { fontSize: 20 },
  f5: { fontSize: 24 },
  f6: { fontSize: 28 },
  f7: { fontSize: 32 },
  f8: { fontSize: 36 },
  f9: { fontSize: 40 },
  f10: { fontSize: 44 },
  // fontSize  .............. end

  // inputBox  ----------- start
  inputBox: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#7D97F4",
  },
  inputBoxEye: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderRadius: {
    borderRadius: 20,
  },
  borderRadius30: {
    borderRadius: 30,
  },
  borderTopLeftRadius30: {
    borderTopLeftRadius: 30,
  },
  borderBottomLeftRadius30: {
    borderBottomLeftRadius: 30,
  },
  borderradius100: {
    borderRadius: 100,
  },
  height70: {
    height: "70%",
  },
  fullheight: {
    height: "100%",
  },
  fullwidth: {
    width: "100%",
  },
  width95: {
    width: "95%",
  },
  width90: {
    width: "90%",
  },
  width82: {
    width: "82%",
  },
  width80: {
    width: "80%",
  },
  width70: {
    width: "70%",
  },
  width30: {
    width: "30%",
  },
  width33: {
    width: "33%",
  },
  width40: {
    width: "40%",
  },
  width47: {
    width: "47%",
  },
  width22: {
    width: "22%",
  },
  width25: {
    width: "25%",
  },
  width18: {
    width: "18%",
  },
  width20: {
    width: "20%",
  },
  width60: {
    width: "60%",
  },
  width65: {
    width: "65%",
  },
  width12: {
    width: "17%",
  },
  eyeIcon: {
    marginLeft: -40,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    padding: 10,
    // borderColor: color.neutral[500],
    // borderWidth: 1,
    borderRadius: 20,
    marginTop: 4,
    marginBottom: 5,
    backgroundColor: color.white,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: "#000",
        elevation: 4,
      },
    }),
  },

  description: {},

  //  inputBox .............. end
  error: {
    color: "red",
    marginTop: 3,
  },
  // Dropdown styles .............. start
  dropdown: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    // borderColor: color.neutral[300],
    // borderWidth: 1,
    borderRadius: 100,
    fontSize: 14,
    // marginBottom: 5,
    backgroundColor: color.white,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: "#000",
        elevation: 4,
      },
    }),
  },

  // Dropdown styles .............. end

  // Login button ----------- start
  Buttoncard: {
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    paddingVertical: 10,
  },
  signupbutton: {
    padding: 15,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    borderRadius: 50,
  },
  disabledButton: {
    padding: 15,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.neutral[100],
    borderRadius: 50,
  },
  signupbuttontwo: {
    padding: 16,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.fontcolor,
    borderRadius: 30,
  },
  radiobutton: {
    paddingVertical: 2,
    width: "30%",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: color.neutral[100],
    borderRadius: 30,
  },

  cancelButtonContainer: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  primaryButton: {
    padding: 15,
    margin: 15,
    backgroundColor: color.primary,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  primaryButtonText:{
    fontWeight:'700',
    fontSize:20,
    color:'#fff',
},

  // Login button .............. end
  // search .............. start

  searchContainer: {
    backgroundColor: "#fcfcfa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
    borderWidth: 0.7,
    borderColor: color.primary,
    borderRadius: 30,
    paddingHorizontal: 10,
  },

  inputsearch: {
    flex: 1,
    color: "#000",
    paddingVertical: 8,
    fontSize: 16,
    width: "100%",
  },
  // search ----------- end
  // Bootstrap styles ----------- start
  flexrow: {
    flexDirection: "row",
  },
  justifysb: {
    justifyContent: "space-between",
  },
  justifysa: {
    justifyContent: "space-around",
  },
  justifystart: {
    justifyContent: "flex-start",
  },
  justifyend: {
    justifyContent: "flex-end",
  },
  justifycenter: {
    justifyContent: "center",
  },

  justifysa: {
    justifyContent: "space-around",
  },

  justifyevenly: {
    justifyContent: "space-evenly",
  },

  alineItemscenter: {
    alignItems: "center",
  },
  textalinecenter: {
    textAlign: "center",
  },
  alineItemsEnd: {
    alignItems: "flex-end",
  },
  alineItemsstart: {
    alignItems: "flex-start",
  },
  alineSelfcenter: {
    alignSelf: "center",
  },
  alineSelfStart: {
    alignSelf: "flex-start",
  },
  alineSelfend: {
    alignSelf: "flex-end",
  },
  textac: {
    textAlign: "center",
  },
  positionabs: {
    position: "absolute",
    bottom: 10,
    width: "90%",
    margin: 0,
  },

  // Bootstrap styles .............. end

  // image ----------start
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  // image ----------end

  // Card ----------start

  Card: {
    padding: 16,
    backgroundColor: color.white,
    borderRadius: 20,
    margin: 3,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: "#000",
        elevation: 3,
      },
    }),
  },

  CardBorderpv: {
    marginVertical: 5,
    textAlignVertical: "top",
    paddingVertical: 10,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
  },
  CardBorder: {
    marginVertical: 5,
    textAlignVertical: "top",
    padding: 10,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
  },

  containerbg: {
    padding: 15,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 30,
      },
    }),
  },
  // Card ............ end

  // Modal ---------- Start
  topCamera: {
    flex: 1,
    justifyContent: "flex-end",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  shadowtop: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  // Modal ............ end

  // Modal cancel---------- Start
  ModalCancel: {
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 100,
    width: "70%",
    backgroundColor: color.neutral[300],
  },

  topDummy: {
    flex: 1,
    opacity: 0,
  },
  // Modal cancel............ end
  // Horizontal line ............ start
  line2: {
    borderBottomWidth: 0.5,
    borderBottomColor: color.neutral[200],
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: color.neutral[300],
  },
  line1: {
    borderBottomWidth: 0.8,
    borderBottomColor: color.neutral[300],
  },
  // Horizontal line............ end

  //=========Filter Starts=========
  filterIcon20: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.navyBlue,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  filterIcon: {
    position: "absolute",
    bottom: 100,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.navyBlue,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  filterOptions: {
    position: "absolute",
    bottom: 150,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  filterOptionText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "black",
  },
  //========Filter ends======
});
