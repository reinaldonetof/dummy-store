### Core Functionality
- [x] **Product Catalog**
- [x] **Category Filtering**: Filter products by categories
- [x] **Sorting**: Sort products by price
- [x] **Product Details**
- [x] **Responsive Design**

### Bonus Features
- [x] **Deep Linking**: Navigate directly to specific categories or products via deep links
- [x] **iOS Reminder Integration**: Native module for adding product purchase reminders to device calendar
- [x] **Error Handling**: Error handling by interceptor, error states and loading indicators
- [x] **Clean Architecture**: Decoupled UI with mappers and service layers
- [ ] **Android Reminder Integration**: Native module for adding product purchase reminders to device calendar
- [ ] **Push Notifications**: TBD

## 🏗️ Architecture

This project follows clean architecture principles with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
├── data/
│   ├── dtos/           # Data Transfer Objects
│   └── mappers/        # Data transformation layer
├── domain/             # Business logic and entities
├── hooks/              # Custom React hooks
├── routes/             # Navigation configuration
├── screens/            # Screen components
├── services/           # API services and HTTP client
├── theme/              # Design system (colors, etc.)
└── modules/  			# Native module integration
```

### Key Architectural Patterns
- **Repository Pattern**: Clean data access through services
- **Mapper Pattern**: Transform API responses to domain models
- **Custom Hooks**: Encapsulate business logic and state management
- **Context API**: Manage component-specific state (quantity selection)

## 🚀 Getting Started

### Installation

   ```bash
   git clone <repository-url>
   cd dummy-store
   npm install
   cd ios && pod install && cd ..
   npm run ios
   ```
## 🔧 Technical Stack

- **Framework**: React Native with Expo (CNG)
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **HTTP Client**: Axios with custom interceptors
- **State Management**: React Hooks + Context API
- **Image Handling**: Expo Image
- **Development Tools**: Reactotron for debugging

## 📡 API Integration

The app integrates with [DummyJSON Products API](https://dummyjson.com/):

- **Products**: `https://dummyjson.com/products`
- **Categories**: `https://dummyjson.com/products/categories`
- **Product Details**: `https://dummyjson.com/products/{id}`
- **Category Products**: `https://dummyjson.com/products/category/{category}`

### Data Flow
1. **Services** handle API communication
2. **Mappers** transform API responses to domain models
3. **Custom Hooks** manage state and business logic
4. **Components** consume clean, typed data

## 🔗 Deep Linking

The app supports deep linking for enhanced user experience:

- **Category Deep Link**: `dummystore://category/{categorySlug}`
- **Product Deep Link**: `dummystore://product/{productId}`

### Example Usage
```bash
# Open specific category
xcrun simctl openurl booted dummystore://home/furniture

# Open specific product
xcrun simctl openurl booted dummystore://detail/3

```

## 📅 Calendar Integration

The app includes a native module for calendar integration:

### iOS Implementation
- Swift-based native module
- EventKit framework integration
- Automatic permission handling

### Android Implementation
- TBD

### Usage
```typescript
import { useCalendarReminder } from './hooks/useCalendarReminder';

const { addReminder } = useCalendarReminder();

// Add product reminder
await addReminder({
  title: 'Buy iPhone 15',
  date: new Date('2024-12-25'),
  notes: 'Don\'t forget to buy this product!'
});
```
## 🛡️ Error Handling

Comprehensive error handling strategy:

- **API Errors**: User-friendly error messages
- **Loading States**: Spinners
- **Empty States**: Helpful messages when no data is available
- **Error Boundaries**: Prevent app crashes from component errors


## 🖼️ Screenshots

### Category View
![Category View](https://github.com/reinaldonetof/dummy-store/blob/development/public/assets/pic-category.png)

### Product Detail
![Product Detail](https://github.com/reinaldonetof/dummy-store/blob/development/public/assets/pic-detail.png)

### Pagination
![Pagination](https://github.com/reinaldonetof/dummy-store/blob/development/public/assets/pic-pagination.png)

## 🎥 Demo Video

[![Demo Video](https://img.shields.io/badge/Watch-Demo%20Video-red?style=for-the-badge&logo=youtube)](https://github.com/reinaldonetof/dummy-store/blob/development/public/assets/video-demo.mp4)

[Click here to watch the demo video](https://github.com/reinaldonetof/dummy-store/blob/development/public/assets/video-demo.mp4)

