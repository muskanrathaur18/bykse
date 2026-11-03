
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS } from '../constants/theme';

export const ProfileScreen = () => {
  const {
    setCurrentScreen,
    user,
    setUser,
    logoutUser,
    savedAddresses,
    setSavedAddresses,
    activeBooking,
    profileSubView,
    setProfileSubView,
  } = useApp();
  const insets = useSafeAreaInsets();

  // Navigation state within Profile section: 'MAIN' or 'DETAILS'
  const currentView = profileSubView || 'MAIN';
  const setCurrentView = setProfileSubView;

  // Modals state
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditEmailModal, setShowEditEmailModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDobModal, setShowDobModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form states
  const [firstNameInput, setFirstNameInput] = useState(user?.firstName || user?.name || '');
  const [lastNameInput, setLastNameInput] = useState(user?.lastName || '');
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [dobInput, setDobInput] = useState(user?.dob || '');

  const [newAddressTitle, setNewAddressTitle] = useState('');
  const [newAddressText, setNewAddressText] = useState('');

  // Handle Save Name
  const handleSaveName = () => {
    const trimmedFirst = firstNameInput.trim();
    const trimmedLast = lastNameInput.trim();
    const fullName = trimmedLast ? `${trimmedFirst} ${trimmedLast}` : trimmedFirst;

    setUser((prev) => ({
      ...prev,
      name: fullName,
      firstName: trimmedFirst,
      lastName: trimmedLast,
    }));
    setShowEditNameModal(false);
  };

  // Handle Save Email
  const handleSaveEmail = () => {
    setUser((prev) => ({
      ...prev,
      email: emailInput.trim(),
    }));
    setShowEditEmailModal(false);
  };

  // Handle Select Gender
  const handleSelectGender = (selectedGender) => {
    setUser((prev) => ({
      ...prev,
      gender: selectedGender,
    }));
    setShowGenderModal(false);
  };

  // Handle Save DOB
  const handleSaveDob = () => {
    setUser((prev) => ({
      ...prev,
      dob: dobInput.trim(),
    }));
    setShowDobModal(false);
  };

  const handleAddAddress = () => {
    if (!newAddressTitle || !newAddressText) return;
    const newPlace = {
      id: 'addr_' + Date.now(),
      title: newAddressTitle,
      address: newAddressText,
      tag: 'location',
      isDefault: false,
      coords: { x: 50, y: 50 },
    };
    setSavedAddresses([...savedAddresses, newPlace]);
    setShowAddAddressModal(false);
    setNewAddressTitle('');
    setNewAddressText('');
  };

  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((a) => a.id !== id));
  };

  const menuItems = [
    {
      id: 'help',
      title: 'Help',
      icon: 'help-circle-outline',
      onPress: () => setCurrentScreen('HELP_CENTER'),
    },
    {
      id: 'history',
      title: 'My Rides History',
      icon: 'time-outline',
      onPress: () => setCurrentScreen('RIDE_HISTORY'),
    },
    {
      id: 'safety',
      title: 'Safety',
      icon: 'shield-checkmark-outline',
      onPress: () => setCurrentScreen('SAFETY_HUB'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => setCurrentScreen('SETTINGS'),
    },
  ];

  /* ---------------------------------------------------- */
  /* VIEW 2: PROFILE DETAILS SCREEN (Exact match to Image 1) */
  /* ---------------------------------------------------- */
  if (currentView === 'DETAILS') {
    return (
      <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <View
          style={[
            styles.detailsHeader,
            { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 12 },
          ]}
        >
          {/* Back Arrow */}
          <TouchableOpacity
            style={{"padding":6,"marginRight":12}}
            onPress={() => setCurrentView('MAIN')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>

          {/* Title: Profile */}
          <Text style={{"fontSize":22,"fontWeight":"700","color":"#0F172A","flex":1}}>Profile</Text>

          {/* Right Help Pill Button */}
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","gap":6,"borderWidth":1,"borderColor":"#E2E8F0","borderRadius":20,"paddingHorizontal":14,"paddingVertical":6}}
            onPress={() => setCurrentScreen('HELP_CENTER')}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={18} color="#0F172A" />
            <Text style={{"fontSize":14,"fontWeight":"600","color":"#0F172A"}}>Help</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{"flex":1,"backgroundColor":"#FFFFFF"}} showsVerticalScrollIndicator={false}>
          {/* 1. Name Row */}
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}
            activeOpacity={0.6}
            onPress={() => {
              setFirstNameInput(user?.firstName || user?.name || '');
              setLastNameInput(user?.lastName || '');
              setShowEditNameModal(true);
            }}
          >
            <View style={{"width":36,"alignItems":"flex-start","marginRight":10}}>
              <Ionicons name="person-outline" size={22} color="#0F172A" />
            </View>
            <View style={{"flex":1}}>
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Name</Text>
              <Text
                style={[
                  styles.detailsValue,
                  !user?.name && styles.requiredValueText,
                ]}
              >
                {user?.name || 'Enter Name'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={{"height":1,"backgroundColor":"#E5E7EB","marginHorizontal":16}} />

          {/* 2. Phone Number Row (No chevron) */}
          <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}>
            <View style={{"width":36,"alignItems":"flex-start","marginRight":10}}>
              <Ionicons name="call-outline" size={22} color="#0F172A" />
            </View>
            <View style={{"flex":1}}>
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Phone Number</Text>
              <Text style={{"fontSize":14,"color":"#475569","marginTop":3}}>
                {user?.phone ? (user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`) : ''}
              </Text>
            </View>
          </View>
          <View style={{"height":1,"backgroundColor":"#E5E7EB","marginHorizontal":16}} />

          {/* 3. Email Row */}
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}
            activeOpacity={0.6}
            onPress={() => {
              setEmailInput(user?.email || '');
              setShowEditEmailModal(true);
            }}
          >
            <View style={{"width":36,"alignItems":"flex-start","marginRight":10}}>
              <Ionicons name="mail-outline" size={22} color="#0F172A" />
            </View>
            <View style={{"flex":1}}>
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Email</Text>
              <Text
                style={[
                  styles.detailsValue,
                  !user?.email && styles.requiredValueText,
                ]}
              >
                {user?.email || 'Enter Email'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={{"height":1,"backgroundColor":"#E5E7EB","marginHorizontal":16}} />

          {/* 4. Gender Row */}
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}
            activeOpacity={0.6}
            onPress={() => setShowGenderModal(true)}
          >
            <View style={{"width":36,"alignItems":"flex-start","marginRight":10}}>
              <Ionicons name="person-outline" size={22} color="#0F172A" />
            </View>
            <View style={{"flex":1}}>
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Gender</Text>
              <Text
                style={[
                  styles.detailsValue,
                  !user?.gender && styles.requiredValueText,
                ]}
              >
                {user?.gender || 'Select Gender'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={{"height":1,"backgroundColor":"#E5E7EB","marginHorizontal":16}} />

          {/* 5. Date of Birth Row */}
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}
            activeOpacity={0.6}
            onPress={() => {
              setDobInput(user?.dob || '');
              setShowDobModal(true);
            }}
          >
            <View style={{"width":36,"alignItems":"flex-start","marginRight":10}}>
              <Ionicons name="calendar-outline" size={22} color="#0F172A" />
            </View>
            <View style={{"flex":1}}>
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Date of Birth</Text>
              <Text
                style={[
                  styles.detailsValue,
                  !user?.dob && styles.requiredValueText,
                ]}
              >
                {user?.dob || 'Enter Date of Birth'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={{"height":1,"backgroundColor":"#E5E7EB","marginHorizontal":16}} />

        </ScrollView>

        {/* Edit Name Popup Modal */}
        <Modal
          visible={showEditNameModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowEditNameModal(false)}
        >
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
            <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
              <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
                <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Edit Name</Text>
                <TouchableOpacity onPress={() => setShowEditNameModal(false)}>
                  <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>

              {/* First Name Input Field */}
              <Text style={{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}}>First Name</Text>
              <View style={{"borderWidth":1,"borderColor":"#CBD5E1","borderRadius":12,"height":48,"flexDirection":"row","alignItems":"center","paddingHorizontal":14,"marginBottom":14,"backgroundColor":"#FFFFFF"}}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#64748B"
                  style={{"marginRight":10}}
                />
                <TextInput
                  style={{"flex":1,"fontSize":15,"color":"#0F172A","paddingVertical":0}}
                  value={firstNameInput}
                  onChangeText={setFirstNameInput}
                  placeholder="First Name"
                  placeholderTextColor="#94A3B8"
                  autoFocus
                />
                {firstNameInput.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setFirstNameInput('')}
                    style={{"padding":4}}
                  >
                    <Ionicons name="close" size={18} color="#0F172A" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Last Name Input Field */}
              <Text style={[{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}, { marginTop: 4 }]}>Last Name</Text>
              <View style={{"borderWidth":1,"borderColor":"#CBD5E1","borderRadius":12,"height":48,"flexDirection":"row","alignItems":"center","paddingHorizontal":14,"marginBottom":14,"backgroundColor":"#FFFFFF"}}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#64748B"
                  style={{"marginRight":10}}
                />
                <TextInput
                  style={{"flex":1,"fontSize":15,"color":"#0F172A","paddingVertical":0}}
                  value={lastNameInput}
                  onChangeText={setLastNameInput}
                  placeholder="Last Name"
                  placeholderTextColor="#94A3B8"
                />
                {lastNameInput.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setLastNameInput('')}
                    style={{"padding":4}}
                  >
                    <Ionicons name="close" size={18} color="#0F172A" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Save Changes Green Button */}
              <TouchableOpacity
                style={[{"backgroundColor":"#0F172A","height":48,"borderRadius":24,"justifyContent":"center","alignItems":"center","marginTop":10}, { marginTop: 14 }]}
                onPress={handleSaveName}
                activeOpacity={0.85}
              >
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#FFFFFF"}}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Edit Email Modal */}
        <Modal visible={showEditEmailModal} transparent animationType="slide">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
            <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
              <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
                <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Edit Email</Text>
                <TouchableOpacity onPress={() => setShowEditEmailModal(false)}>
                  <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>
              <Text style={{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}}>Email Address</Text>
              <TextInput
                style={{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":15,"color":"#0F172A"}}
                value={emailInput}
                onChangeText={setEmailInput}
                placeholder="example@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[{"backgroundColor":"#0F172A","height":48,"borderRadius":24,"justifyContent":"center","alignItems":"center","marginTop":10}, { marginTop: 20 }]}
                onPress={handleSaveEmail}
              >
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#FFFFFF"}}>Save Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Gender Selection Modal */}
        <Modal visible={showGenderModal} transparent animationType="fade">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
            <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
              <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
                <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Select Gender</Text>
                <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                  <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>

              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderOptionRow,
                    user?.gender === g && styles.genderOptionRowSelected,
                  ]}
                  onPress={() => handleSelectGender(g)}
                >
                  <Text
                    style={[
                      styles.genderOptionText,
                      user?.gender === g && styles.genderOptionTextSelected,
                    ]}
                  >
                    {g}
                  </Text>
                  {user?.gender === g && (
                    <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* DOB Modal */}
        <Modal visible={showDobModal} transparent animationType="slide">
          <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
            <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
              <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
                <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setShowDobModal(false)}>
                  <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
              </View>
              <Text style={{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}}>Enter Birth Date (DD/MM/YYYY)</Text>
              <TextInput
                style={{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":15,"color":"#0F172A"}}
                value={dobInput}
                onChangeText={setDobInput}
                placeholder="e.g. 15/08/1998"
              />
              <TouchableOpacity
                style={[{"backgroundColor":"#0F172A","height":48,"borderRadius":24,"justifyContent":"center","alignItems":"center","marginTop":10}, { marginTop: 20 }]}
                onPress={handleSaveDob}
              >
                <Text style={{"fontSize":16,"fontWeight":"700","color":"#FFFFFF"}}>Save Date of Birth</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  /* ---------------------------------------------------- */
  /* VIEW 1: MAIN PROFILE SCREEN                          */
  /* ---------------------------------------------------- */
  return (
    <View style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={{"flex":1,"backgroundColor":"#FFFFFF"}}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, StatusBar.currentHeight || 24) + 12 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Screen Title */}
        <Text style={{"fontSize":26,"fontWeight":"800","color":"#0A0F1D","paddingHorizontal":20,"marginBottom":16}}>Profile</Text>

        {/* Top White Profile Card (User Row: nick / phone) */}
        <View style={{"backgroundColor":"#FFFFFF","marginHorizontal":16,"borderRadius":16,"borderWidth":1,"borderColor":"#E2E8F0","marginBottom":20}}>
          <TouchableOpacity
            style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":18,"paddingVertical":18}}
            activeOpacity={0.7}
            onPress={() => setCurrentView('DETAILS')}
          >
            {/* Avatar with circle outline & person silhouette */}
            <View style={{"width":48,"height":48,"borderRadius":24,"borderWidth":2.2,"borderColor":"#1C375A","justifyContent":"center","alignItems":"center","marginRight":16,"backgroundColor":"#FFFFFF"}}>
              <Ionicons name="person" size={22} color="#556987" />
            </View>

            {/* Name & Phone */}
            <View style={{"flex":1}}>
              {user?.name ? (
                <>
                  <Text style={{"fontSize":18,"fontWeight":"700","color":"#0F172A"}}>{user.name}</Text>
                  {user?.phone ? (
                    <Text style={{"fontSize":15,"color":"#475569","marginTop":3,"fontWeight":"500"}}>
                      {user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`}
                    </Text>
                  ) : null}
                </>
              ) : (
                <Text style={{"fontSize":18,"fontWeight":"700","color":"#0F172A"}}>
                  {user?.phone
                    ? (user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`)
                    : 'Profile'}
                </Text>
              )}
            </View>

            {/* Chevron Right */}
            <Ionicons name="chevron-forward" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Menu Items List */}
        <View style={{"marginTop":6}}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":20,"paddingVertical":18}}
                activeOpacity={0.6}
                onPress={item.onPress}
              >
                <View style={{"width":32,"alignItems":"flex-start","marginRight":12}}>
                  <Ionicons name={item.icon} size={24} color="#1E293B" />
                </View>
                <Text style={{"fontSize":16,"fontWeight":"600","color":"#0F172A","flex":1}}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </TouchableOpacity>
              <View style={{"height":1,"backgroundColor":"#F1F5F9"}} />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} transparent animationType="slide">
        <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
          <View style={[{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}, { maxHeight: '85%' }]}>
            <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
              <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Saved Addresses Section */}
              <View style={{"marginBottom":16}}>
                <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":10}}>
                  <Text style={{"fontSize":15,"fontWeight":"700","color":"#0F172A"}}>Saved Addresses</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowSettingsModal(false);
                      setShowAddAddressModal(true);
                    }}
                  >
                    <Text style={{"fontSize":13,"fontWeight":"700","color":"#D97706"}}>+ Add New</Text>
                  </TouchableOpacity>
                </View>

                {savedAddresses.map((item) => (
                  <View key={item.id} style={{"flexDirection":"row","alignItems":"center","backgroundColor":"#F8FAFC","padding":12,"borderRadius":10,"marginBottom":8}}>
                    <Ionicons
                      name={item.tag === 'home' ? 'home' : item.tag === 'briefcase' ? 'briefcase' : 'location'}
                      size={18}
                      color="#1E293B"
                    />
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                      <Text style={{"fontSize":14,"fontWeight":"700","color":"#0F172A"}}>{item.title}</Text>
                      <Text style={{"fontSize":12,"color":"#64748B"}} numberOfLines={1}>
                        {item.address}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteAddress(item.id)}>
                      <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>



              {/* App Preferences */}
              <View style={{"flexDirection":"row","alignItems":"center","paddingVertical":14,"borderBottomWidth":1}}>
                <Ionicons name="notifications-outline" size={20} color="#1E293B" />
                <Text style={{"fontSize":15,"fontWeight":"600","color":"#0F172A","flex":1,"marginLeft":12}}>Ride Notifications</Text>
                <Text style={{ fontSize: 13, color: '#16A34A', fontWeight: '700' }}>Enabled</Text>
              </View>

              {/* Logout Button */}
              <TouchableOpacity
                style={{"flexDirection":"row","alignItems":"center","justifyContent":"center","paddingVertical":14,"borderRadius":12,"backgroundColor":"#FEF2F2","marginTop":18,"gap":8}}
                onPress={() => {
                  setShowSettingsModal(false);
                  logoutUser();
                }}
              >
                <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
                <Text style={{"fontSize":15,"fontWeight":"700","color":"#DC2626"}}>Log Out</Text>
              </TouchableOpacity>

              {/* Delete Account */}
              <TouchableOpacity
                style={{"alignItems":"center","paddingVertical":12,"marginTop":4}}
                onPress={() => {
                  setShowSettingsModal(false);
                  setShowDeleteModal(true);
                }}
              >
                <Text style={{"fontSize":13,"color":"#94A3B8"}}>Delete Bykse Account</Text>
              </TouchableOpacity>

              <Text style={{"fontSize":11,"color":"#94A3B8","textAlign":"center","marginTop":8,"marginBottom":4}}>Bykse Version 2.4.1 (Build 120)</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Address Modal */}
      <Modal visible={showAddAddressModal} transparent animationType="slide">
        <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
          <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
            <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":16}}>
              <Text style={{"fontSize":19,"fontWeight":"800","color":"#0F172A"}}>Add New Address</Text>
              <TouchableOpacity onPress={() => setShowAddAddressModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <Text style={{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}}>Address Label</Text>
            <TextInput
              style={{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":15,"color":"#0F172A"}}
              placeholder="e.g. Gym, Office, Home"
              value={newAddressTitle}
              onChangeText={setNewAddressTitle}
            />

            <Text style={[{"fontSize":13,"fontWeight":"700","color":"#475569","marginBottom":6}, { marginTop: 12 }]}>Full Address</Text>
            <TextInput
              style={[{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":15,"color":"#0F172A"}, { height: 60 }]}
              placeholder="Building, street, locality..."
              multiline
              value={newAddressText}
              onChangeText={setNewAddressText}
            />

            <TouchableOpacity
              style={[{"backgroundColor":"#0F172A","height":48,"borderRadius":24,"justifyContent":"center","alignItems":"center","marginTop":10}, { marginTop: 20 }]}
              onPress={handleAddAddress}
            >
              <Text style={{"fontSize":16,"fontWeight":"700","color":"#FFFFFF"}}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Account Warning Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={{"flex":1,"backgroundColor":"rgba(0,0,0,0.5)","justifyContent":"center","alignItems":"center","padding":20}}>
          <View style={{"width":"100%","backgroundColor":"#FFFFFF","borderRadius":20,"padding":22}}>
            <Ionicons name="warning" size={42} color={COLORS.danger} />
            <Text style={[{"fontSize":19,"fontWeight":"800","color":"#0F172A"}, { marginTop: 10 }]}>Delete Account?</Text>
            <Text style={{"fontSize":14,"color":"#64748B","marginVertical":14,"textAlign":"center","lineHeight":20}}>
              {activeBooking
                ? 'You have an ongoing ride active. Complete or cancel your ride before requesting account deletion.'
                : 'Permanently deletes your ride history, wallet balances, and preferences.'}
            </Text>

            <TouchableOpacity
              style={{"borderWidth":1,"borderColor":"#CBD5E1","borderRadius":12,"paddingVertical":12,"alignItems":"center","marginBottom":10}}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#475569"}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{"backgroundColor":"#DC2626","borderRadius":12,"paddingVertical":12,"alignItems":"center"}}
              onPress={() => {
                setShowDeleteModal(false);
                logoutUser();
              }}
            >
              <Text style={{"fontSize":15,"fontWeight":"700","color":"#FFFFFF"}}>Yes, Delete My Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailsValue: {
    fontSize: 14,
    color: '#475569',
    marginTop: 3,
  },
  requiredValueText: {
    color: '#A16207',
    fontWeight: '600',
  },
  genderOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  genderOptionRowSelected: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  genderOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  genderOptionTextSelected: {
    color: '#16A34A',
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 60,
  },
});

