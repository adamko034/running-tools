# Google Ad Component Usage

## Basic Usage

```html
<!-- Basic ad with required slot ID -->
<app-google-ad adSlot="1234567890"></app-google-ad>

<!-- Ad with custom height -->
<app-google-ad 
  adSlot="1234567890" 
  minHeight="300px">
</app-google-ad>

<!-- Responsive banner ad -->
<app-google-ad 
  adSlot="1234567890"
  adFormat="auto"
  [fullWidthResponsive]="true">
</app-google-ad>

<!-- Rectangle ad -->
<app-google-ad 
  adSlot="1234567890"
  adFormat="rectangle"
  minHeight="250px">
</app-google-ad>
```

## Component Inputs

- `adSlot` (required): Your Google AdSense ad slot ID
- `adFormat`: Ad format ('auto', 'rectangle', etc.) - default: 'auto'
- `adLayout`: Optional layout parameter
- `adLayoutKey`: Optional layout key parameter  
- `fullWidthResponsive`: Enable responsive ads - default: true
- `minHeight`: Minimum height for placeholder states - default: '250px'

## Features

1. **Consent Management**: Automatically checks for advertising consent
2. **Loading States**: Shows loading spinner while ad loads
3. **Error Handling**: Displays retry option if ad fails to load
4. **No Consent State**: Shows message encouraging users to enable ads
5. **Responsive**: Works on all device sizes
6. **Accessibility**: Proper ARIA labels and semantic HTML

## States

1. **No Consent**: User hasn't accepted advertising cookies
2. **Loading**: Ad is being loaded from Google
3. **Loaded**: Ad successfully displayed
4. **Error**: Ad failed to load (with retry option)

## Integration

The component automatically:
- Listens for cookie consent changes
- Integrates with your existing cookie consent system
- Handles Google AdSense initialization
- Provides user-friendly fallbacks for all states