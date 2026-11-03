import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';

export const GlobalBottomNav = () => {
  const {
    currentScreen,
    setCurrentScreen,
    showWeddingModal,
    setShowWeddingModal,
  } = useApp();

  const insets = useSafeAreaInsets();

  // Determine active bottom tab based on current screen
  const getActiveTab = () => {
    if (currentScreen === 'WEDDING_RIDES' || showWeddingModal) return 'Wedding';
    if (currentScreen === 'PARCEL_DELIVERY') return 'Parcel';
    if (currentScreen === 'PROFILE' || currentScreen === 'RIDE_HISTORY') return 'Profile';
    return 'Ride';
  };

  const activeTab = getActiveTab();

  const handleTabPress = (tabName) => {
    if (tabName === 'Ride') {
      setShowWeddingModal(false);
      setCurrentScreen('HOME');
    } else if (tabName === 'Parcel') {
      setShowWeddingModal(false);
      setCurrentScreen('PARCEL_DELIVERY');
    } else if (tabName === 'Wedding') {
      setShowWeddingModal(false);
      setCurrentScreen('WEDDING_RIDES');
    } else if (tabName === 'Profile') {
      setShowWeddingModal(false);
      setCurrentScreen('PROFILE');
    }
  };


  return (
    <>
      {/* 4-TAB BOTTOM NAVIGATION BAR */}
      <View
        style={[
          styles.bottomNavContainer,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 10,
            height: 62 + (insets.bottom > 0 ? insets.bottom : 8),
          },
        ]}
      >
        {/* TAB 1: RIDE */}
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress('Ride')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === 'Ride' ? 'navigate' : 'navigate-outline'}
            size={24}
            color={activeTab === 'Ride' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[
              styles.bottomNavLabel,
              activeTab === 'Ride' && styles.bottomNavLabelActive,
            ]}
          >
            Ride
          </Text>
        </TouchableOpacity>

        {/* TAB 2: PARCEL */}
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress('Parcel')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={activeTab === 'Parcel' ? 'package-variant' : 'package-variant-closed'}
            size={24}
            color={activeTab === 'Parcel' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[
              styles.bottomNavLabel,
              activeTab === 'Parcel' && styles.bottomNavLabelActive,
            ]}
          >
            Parcel
          </Text>
        </TouchableOpacity>

        {/* TAB 3: WEDDING */}
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress('Wedding')}
          activeOpacity={0.7}
        >
          <FontAwesome5
            name="car-side"
            size={22}
            color={activeTab === 'Wedding' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[
              styles.bottomNavLabel,
              activeTab === 'Wedding' && styles.bottomNavLabelActive,
            ]}
          >
            Wedding
          </Text>
        </TouchableOpacity>

        {/* TAB 4: PROFILE */}
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress('Profile')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === 'Profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'Profile' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[
              styles.bottomNavLabel,
              activeTab === 'Profile' && styles.bottomNavLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* GLOBAL WEDDING RIDES DETAIL MODAL */}
      <Modal visible={!!showWeddingModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.weddingModalCard}>
            <View style={styles.modalGrabBar} />
            <View style={styles.allServicesHeader}>
              <View>
                <Text style={styles.weddingModalHeading}>Wedding Rides Fleet 🎉</Text>
                <Text style={styles.weddingModalSub}>Premium convoy & decorated cars for marriage functions</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseCircle}
                onPress={() => setShowWeddingModal(false)}
              >
                <Ionicons name="close" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380 }}>
              {/* Option 1: Decorated Groom Sedan */}
              <View style={styles.weddingOptionCard}>
                <View style={styles.weddingOptionIconWrap}>
                  <FontAwesome5 name="car-side" size={26} color="#B45309" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.weddingOptionTitle}>Decorated Groom Sedan</Text>
                  <Text style={styles.weddingOptionDesc}>Fresh flower garland, premium AC sedan with uniformed chauffeur.</Text>
                  <Text style={styles.weddingOptionPrice}>Starting at ₹4,999 / 8 hrs</Text>
                </View>
              </View>

              {/* Option 2: Guest Convoy (Innova & Cabs) */}
              <View style={styles.weddingOptionCard}>
                <View style={[styles.weddingOptionIconWrap, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="car" size={26} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.weddingOptionTitle}>Guest Convoy Fleet (3+ Cabs)</Text>
                  <Text style={styles.weddingOptionDesc}>Simultaneous pickup for Baraat and guests from airport / station to venue.</Text>
                  <Text style={styles.weddingOptionPrice}>Flat 25% Group Discount</Text>
                </View>
              </View>

              {/* Option 3: Luxury Mercedes / Audi */}
              <View style={styles.weddingOptionCard}>
                <View style={[styles.weddingOptionIconWrap, { backgroundColor: '#FDF2F8' }]}>
                  <FontAwesome5 name="gem" size={24} color="#DB2777" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.weddingOptionTitle}>Luxury Premium Fleet</Text>
                  <Text style={styles.weddingOptionDesc}>Audi, Mercedes & BMW luxury rides for VIP wedding entries.</Text>
                  <Text style={styles.weddingOptionPrice}>On-demand customized quote</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.weddingBookBtn}
              onPress={() => {
                setShowWeddingModal(false);
                setCurrentScreen('LOCATION_SEARCH');
              }}
            >
              <Text style={styles.weddingBookBtnText}>Book Wedding Transport</Text>
              <Ionicons name="arrow-forward" size={18} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 999,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  bottomNavLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 3,
  },
  bottomNavLabelActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  weddingModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  modalGrabBar: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 16,
  },
  allServicesHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weddingModalHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  weddingModalSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  modalCloseCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weddingOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  weddingOptionIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  weddingOptionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  weddingOptionDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 4,
  },
  weddingOptionPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
  },
  weddingBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weddingBookBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
});
