import colors from './colors';

export default {
  pageTitle: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
  },
  error: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    top: -15,
  },
  errorWhite: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    top: -15,
  },
  body: {
    flex: 1,
   
    flexDirection: 'column',
  },
  container: {
    // margin: 10,
    marginVertical:10,
    marginLeft:7,
    marginRight:10,
    borderRadius: 10,
    backgroundColor: colors.backgroung,
  },
  bodyGlobal: {
    flex: 1,
    backgroundColor: colors.backgroung,
    flexDirection: 'column',
  },
  containerItems: {
    flex: 1,
    margin: 20,
    backgroundColor: colors.backgroung,
  },
  textWhite: {
    color: '#fff',
  },
  fs17: { fontSize: 17 },
};
