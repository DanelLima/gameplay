import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  useFonts,
  Rajdhani_400Regular,
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';

const COLORS = {
  bg: '#0E1647',
  bgDark: '#0A0F33',
  card: '#1A2260',
  cardBorder: '#2A3380',
  primary: '#E51C44',
  text: '#FFFFFF',
  muted: '#7C82B3',
  green: '#2BD07A',
  divider: '#1F2766',
};

const FONTS = {
  regular: 'Rajdhani_400Regular',
  medium: 'Rajdhani_500Medium',
  semibold: 'Rajdhani_600SemiBold',
  bold: 'Rajdhani_700Bold',
};

const CATEGORIES = [
  { id: '1', label: 'Ranqueada', icon: 'trophy-variant' },
  { id: '2', label: 'Duelo 1x1', icon: 'sword-cross' },
  { id: '3', label: 'Diversão', icon: 'emoticon-happy' },
  { id: '4', label: 'Casual', icon: 'controller-classic' },
];

const MATCHES = [
  { id: '1', game: 'Lendários', mode: 'Ranqueada', date: '18/06 às 21:00h', host: true, image: require('./assets/images/lol.png') },
  { id: '2', game: 'Yeah, boy', mode: 'Diversão', date: '23/06 às 19:00h', host: false, image: require('./assets/images/rdr.png') },
  { id: '3', game: 'Rumo ao topo', mode: '1×1', date: '20/06 às 09:00h', host: true, image: require('./assets/images/csgo.png') },
  { id: '4', game: 'Bora queimar tudo', mode: 'Ranqueada', date: '20/06 às 14:20h', host: true, image: require('./assets/images/apex.png') },
  { id: '5', game: 'Valorosos', mode: 'Diversão', date: '18/06 às 21:00h', host: true, image: require('./assets/images/valorant.png') },
];

/* ---------------- Splash ---------------- */
function Splash() {
  return (
    <View style={[styles.screen, styles.center]}>
      <View style={styles.playTriangle} />
      <Text style={styles.logo}>
        Game<Text style={{ color: COLORS.primary }}>Play</Text>
      </Text>
    </View>
  );
}

/* ---------------- Login ---------------- */
function Login({ onLogin }) {
  return (
    <View style={styles.screen}>
      <View style={styles.banner}>
        <View style={[styles.stripe, { top: 60, right: -40, height: 90, opacity: 0.9 }]} />
        <View style={[styles.stripe, { top: 150, right: -80, height: 60, opacity: 0.6 }]} />
        <Image source={require('./assets/images/tekken.png')} style={styles.bannerImage} resizeMode="contain" />
        <LinearGradient
          colors={['transparent', COLORS.bg]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </View>

      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Conecte-se{'\n'}e organize suas{'\n'}jogatinas</Text>
        <Text style={styles.loginSubtitle}>
          Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
        </Text>

        <TouchableOpacity style={styles.discordBtn} activeOpacity={0.8} onPress={onLogin}>
          <View style={styles.discordIcon}>
            <FontAwesome5 name="discord" size={20} color="#fff" />
          </View>
          <Text style={styles.discordText}>Entrar com Discord</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- Home ---------------- */
function Home({ onOpenMatch, onAdd }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image source={require('./assets/images/careca.png')} style={styles.avatarImage} resizeMode="cover" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.hello}>
            Olá, <Text style={{ fontFamily: FONTS.bold }}>Tiago</Text>
          </Text>
          <Text style={styles.subHello}>Hoje é dia de vitória</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={onAdd}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={{ height: 112 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c.id} style={styles.category} activeOpacity={0.8}>
              <MaterialCommunityIcons name={c.icon} size={40} color={COLORS.primary} />
              <Text style={styles.categoryLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Partidas agendadas</Text>
        <Text style={styles.total}>Total {MATCHES.length}</Text>
      </View>

      <FlatList
        data={MATCHES}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <MatchItem item={item} onPress={() => onOpenMatch(item)} />}
      />
    </SafeAreaView>
  );
}

function MatchItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.match} activeOpacity={0.8} onPress={onPress}>
      <Image source={item.image} style={styles.gameThumb} resizeMode="cover" />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.matchTitle} numberOfLines={1}>{item.game}</Text>
          <Text style={styles.matchMode}>{item.mode}</Text>
        </View>
        <View style={[styles.rowBetween, { marginTop: 10 }]}>
          <View style={styles.row}>
            <Ionicons name="calendar" size={16} color={COLORS.primary} />
            <Text style={styles.matchDate}>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="person" size={14} color={item.host ? COLORS.primary : COLORS.green} />
            <Text style={[styles.role, { color: item.host ? COLORS.primary : COLORS.green }]}>
              {item.host ? 'Anfitrião' : 'Visitante'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* ---------------- Header compartilhado ---------------- */
function Header({ title, onBack, onShare }) {
  return (
    <SafeAreaView edges={['top']} style={styles.topBar}>
      <View style={styles.topBarRow}>
        <TouchableOpacity onPress={onBack} hitSlop={12} style={styles.topBarSide}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{title}</Text>
        <View style={[styles.topBarSide, { alignItems: 'flex-end' }]}>
          {onShare && (
            <TouchableOpacity onPress={onShare} hitSlop={12}>
              <Ionicons name="share-social" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Detalhes do servidor ---------------- */
const PLAYERS = [
  { id: '1', name: 'Tiago Luchtenberg', available: true },
  { id: '2', name: 'Rodrigo Gonçalves', available: false },
  { id: '3', name: 'Diego Fernandes', available: false },
];

function Details({ match, onBack }) {
  return (
    <View style={styles.screen}>
      <Header title="Detalhes" onBack={onBack} onShare={() => {}} />

      <ImageBackground
        source={require('./assets/images/lendarios.png')}
        style={styles.detailBanner}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(14,22,71,0.25)', COLORS.bg]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Text style={styles.detailTitle}>{match?.game ?? 'Lendários'}</Text>
        <Text style={styles.detailDesc}>
          É hoje que vamos chegar ao challenger sem perder uma partida da md10
        </Text>
      </ImageBackground>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Jogadores</Text>
        <Text style={styles.total}>Total {PLAYERS.length}</Text>
      </View>

      <FlatList
        data={PLAYERS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.match}>
            <View style={styles.playerAvatar}>
              <Ionicons name="person" size={26} color="#fff" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.playerName}>{item.name}</Text>
              <View style={[styles.row, { marginTop: 6 }]}>
                <View style={[styles.dot, { backgroundColor: item.available ? COLORS.green : COLORS.primary }]} />
                <Text style={styles.matchDate}>{item.available ? 'Disponível' : 'Ocupado'}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <SafeAreaView edges={['bottom']} style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
        <TouchableOpacity style={styles.discordBtn} activeOpacity={0.8}>
          <View style={styles.discordIcon}>
            <FontAwesome5 name="discord" size={20} color="#fff" />
          </View>
          <Text style={styles.discordText}>Entrar na partida</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

/* ---------------- Agendar partida ---------------- */
function Schedule({ onBack }) {
  const [category, setCategory] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.screen}>
      <Header title="Agendar partida" onBack={onBack} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
          <Text style={[styles.label, { marginTop: 28, marginLeft: 24 }]}>Categoria</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }} contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
            {CATEGORIES.map((c) => {
              const selected = category === c.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  activeOpacity={0.8}
                  onPress={() => setCategory(c.id)}
                  style={[styles.category, selected && styles.categorySelected]}
                >
                  <View style={[styles.checkbox, selected && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }]} />
                  <MaterialCommunityIcons name={c.icon} size={40} color={selected ? COLORS.primary : '#8C3A63'} />
                  <Text style={[styles.categoryLabel, !selected && { color: COLORS.muted }]}>{c.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.serverSelect} activeOpacity={0.8}>
            <View style={styles.serverIcon} />
            <Text style={styles.serverText}>Selecione um servidor</Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" style={{ marginRight: 16 }} />
          </TouchableOpacity>

          <View style={styles.dateRow}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={[styles.row, { marginTop: 12, gap: 8 }]}>
                <TextInput style={styles.smallInput} value={day} onChangeText={setDay} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.sep}>/</Text>
                <TextInput style={styles.smallInput} value={month} onChangeText={setMonth} keyboardType="number-pad" maxLength={2} />
              </View>
            </View>
            <View>
              <Text style={[styles.label, { textAlign: 'right' }]}>Hora e minuto</Text>
              <View style={[styles.row, { marginTop: 12, gap: 8, justifyContent: 'flex-end' }]}>
                <TextInput style={styles.smallInput} value={hour} onChangeText={setHour} keyboardType="number-pad" maxLength={2} />
                <Text style={styles.sep}>:</Text>
                <TextInput style={styles.smallInput} value={minute} onChangeText={setMinute} keyboardType="number-pad" maxLength={2} />
              </View>
            </View>
          </View>

          <View style={styles.descHeader}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.total}>Max 100 caracteres</Text>
          </View>
          <TextInput
            style={styles.descInput}
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={100}
            textAlignVertical="top"
          />
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
          <TouchableOpacity style={styles.scheduleBtn} activeOpacity={0.8} onPress={onBack}>
            <Text style={styles.discordText}>Agendar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setScreen('login'), 2000);
    return () => clearTimeout(t);
  }, []);

  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
  });

  if (!fontsLoaded) return null;

  const goHome = () => setScreen('home');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {screen === 'splash' && <Splash />}
      {screen === 'login' && <Login onLogin={goHome} />}
      {screen === 'home' && (
        <Home
          onOpenMatch={(m) => {
            setSelectedMatch(m);
            setScreen('details');
          }}
          onAdd={() => setScreen('schedule')}
        />
      )}
      {screen === 'details' && <Details match={selectedMatch} onBack={goHome} />}
      {screen === 'schedule' && <Schedule onBack={goHome} />}
    </SafeAreaProvider>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  // Splash
  playTriangle: {
    position: 'absolute',
    left: '40%',
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderBottomWidth: 50,
    borderLeftWidth: 85,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'rgba(255,255,255,0.06)',
  },
  logo: { fontFamily: FONTS.bold, fontSize: 40, color: '#E1E3F5' },

  // Login
  bannerImage: { width: '100%', height: '100%' },
  avatarImage: { width: '100%', height: '100%' },
  banner: { height: '55%', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: COLORS.bg },
  stripe: { position: 'absolute', left: -40, backgroundColor: COLORS.primary, transform: [{ skewY: '-20deg' }] },
  loginContent: { flex: 1, paddingHorizontal: 40, marginTop: -60 },
  loginTitle: { fontFamily: FONTS.bold, fontSize: 34, lineHeight: 38, color: '#E1E3F5', textAlign: 'center' },
  loginSubtitle: { fontFamily: FONTS.medium, fontSize: 15, lineHeight: 22, color: '#B9BEE0', textAlign: 'center', marginTop: 20 },
  discordBtn: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
    marginTop: 40,
  },
  discordIcon: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.2)',
  },
  discordText: { fontFamily: FONTS.semibold, flex: 1, textAlign: 'center', alignSelf: 'center', color: '#fff', fontSize: 15 },

  // Home
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 28 },
  avatar: {
    width: 48,
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hello: { fontFamily: FONTS.medium, color: '#fff', fontSize: 22 },
  subHello: { fontFamily: FONTS.medium, color: COLORS.muted, fontSize: 13, marginTop: 2 },
  addBtn: { width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },

  category: {
    width: 104,
    height: 104,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  categoryLabel: { fontFamily: FONTS.semibold, color: '#fff', fontSize: 13 },

  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 24, marginBottom: 18 },
  listTitle: { fontFamily: FONTS.bold, color: '#fff', fontSize: 18 },
  total: { fontFamily: FONTS.medium, color: COLORS.muted, fontSize: 13 },

  match: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  gameThumb: { width: 64, height: 76, borderRadius: 8 },
  matchTitle: { fontFamily: FONTS.bold, color: '#fff', fontSize: 17, flex: 1, marginRight: 8 },
  matchMode: { fontFamily: FONTS.medium, color: COLORS.muted, fontSize: 13 },
  matchDate: { fontFamily: FONTS.medium, color: '#D6D9F0', fontSize: 13 },
  role: { fontFamily: FONTS.semibold, fontSize: 13 },
  separator: { height: 1, backgroundColor: COLORS.divider, marginVertical: 14, marginLeft: 80 },

  // Header compartilhado
  topBar: { backgroundColor: '#131B58' },
  topBarRow: { flexDirection: 'row', alignItems: 'center', height: 64, paddingHorizontal: 24 },
  topBarSide: { width: 40 },
  topBarTitle: { fontFamily: FONTS.bold, flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 },

  // Detalhes
  detailBanner: { height: 200, overflow: 'hidden', paddingHorizontal: 24, justifyContent: 'flex-end', paddingBottom: 24 },
  detailTitle: { fontFamily: FONTS.bold, color: '#fff', fontSize: 28 },
  detailDesc: { fontFamily: FONTS.medium, color: '#D6D9F0', fontSize: 14, lineHeight: 20, marginTop: 12 },
  playerAvatar: { width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.card, borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  playerName: { fontFamily: FONTS.bold, color: '#fff', fontSize: 17 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  // Agendar
  label: { fontFamily: FONTS.bold, color: '#fff', fontSize: 16 },
  categorySelected: { borderColor: '#B9BEE0', borderWidth: 3, backgroundColor: '#232B6E' },
  checkbox: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 2, borderWidth: 1, borderColor: COLORS.muted },
  serverSelect: { flexDirection: 'row', alignItems: 'center', height: 68, marginHorizontal: 24, marginTop: 28, borderRadius: 8, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder, overflow: 'hidden' },
  serverIcon: { width: 68, height: '100%', backgroundColor: '#232B6E', marginRight: 16 },
  serverText: { fontFamily: FONTS.semibold, flex: 1, color: '#fff', fontSize: 15, textAlign: 'center' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 28 },
  smallInput: { fontFamily: FONTS.medium, width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder, color: '#fff', fontSize: 17, textAlign: 'center' },
  sep: { fontFamily: FONTS.medium, color: COLORS.muted, fontSize: 16 },
  descHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 28, marginBottom: 12 },
  descInput: { fontFamily: FONTS.medium, height: 100, marginHorizontal: 24, borderRadius: 8, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder, color: '#fff', fontSize: 15, padding: 12 },
  scheduleBtn: { height: 56, borderRadius: 8, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
});