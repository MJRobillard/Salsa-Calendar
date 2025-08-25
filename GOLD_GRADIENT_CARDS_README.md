# Gold Gradient Card Styles

This document explains how to implement and use the gold gradient card styles across your Salsa Calendar application.

## Overview

The gold gradient card style creates a beautiful glowing effect with:
- **Primary color (inner glow)**: Saturated yellow-gold (#FFD966)
- **Secondary color (outer glow)**: Deeper amber-gold (#B8860B)
- **Background**: Dark navy (#0A0F1C) to maintain readability

## Implementation Methods

### 1. CSS Classes (Recommended)

Use the predefined CSS classes for consistent styling:

```tsx
<div className="card-gold-gradient">
  <div className="card-gold-gradient-content">
    {/* Your content here */}
    <h2>Card Title</h2>
    <p>Card content goes here</p>
  </div>
</div>
```

### 2. React Component

Import and use the reusable component:

```tsx
import GoldGradientCard from '../components/GoldGradientCard';

<GoldGradientCard>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</GoldGradientCard>
```

### 3. Inline Styles

For custom variations, use inline styles:

```tsx
<div 
  className="rounded-xl2 p-[2px] relative"
  style={{
    background: 'linear-gradient(135deg, #FFD966, #B8860B)',
    boxShadow: '0 0 6px 2px #FFD966, 0 0 12px 4px #B8860B'
  }}
>
  <div className="bg-[#0A0F1C] rounded-xl2 p-6 relative z-10">
    {/* Your content here */}
  </div>
</div>
```

### 4. Border Only

Apply gold gradient borders to existing content:

```tsx
import { GoldGradientBorder } from '../components/GoldGradientCard';

<GoldGradientBorder>
  <div className="p-6">
    {/* Your existing content */}
  </div>
</GoldGradientBorder>
```

## CSS Classes Available

### `.card-gold-gradient`
- Creates the outer container with gold gradient background
- Applies rounded corners and positioning
- Includes the glowing shadow effect

### `.card-gold-gradient-content`
- Creates the inner content container
- Applies dark background (#0A0F1C)
- Handles padding and z-index positioning

### `.border-gold-gradient`
- Utility class for gold gradient borders
- Can be applied to existing elements

## Customization Options

### Gradient Direction
Change the angle of the gradient by modifying the `linear-gradient` direction:

```css
/* 135° (default) */
background: linear-gradient(135deg, #FFD966, #B8860B);

/* 45° (diagonal) */
background: linear-gradient(45deg, #FFD966, #B8860B);

/* 90° (vertical) */
background: linear-gradient(90deg, #FFD966, #B8860B);
```

### Glow Intensity
Adjust the shadow values to control glow intensity:

```css
/* Subtle glow */
box-shadow: 0 0 4px 1px #FFD966, 0 0 8px 2px #B8860B;

/* Strong glow */
box-shadow: 0 0 8px 3px #FFD966, 0 0 16px 6px #B8860B;
```

### Border Thickness
Modify the padding to change border thickness:

```css
/* Thin border */
padding: 1px;

/* Medium border (default) */
padding: 2px;

/* Thick border */
padding: 4px;
```

## Usage Examples

### Basic Card
```tsx
<div className="card-gold-gradient">
  <div className="card-gold-gradient-content">
    <h3 className="text-xl font-bold text-brand-gold mb-4">Card Title</h3>
    <p className="text-brand-sand">Card description goes here</p>
  </div>
</div>
```

### Card with Custom Content
```tsx
<GoldGradientCard contentClassName="text-center">
  <div className="flex items-center justify-center gap-4">
    <div className="bg-brand-maroon/20 p-4 rounded-xl border border-brand-maroon/30">
      <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-2" />
      <p className="text-brand-gold font-semibold">Donation</p>
    </div>
  </div>
</GoldGradientCard>
```

### Custom Styling
```tsx
<GoldGradientCardInline>
  <div className="bg-brand-charcoal/50 p-4 rounded-xl">
    <h4 className="text-lg font-semibold text-brand-gold mb-2">Custom Style</h4>
    <p className="text-brand-sand">Content with custom background</p>
  </div>
</GoldGradientCardInline>
```

## Best Practices

1. **Consistency**: Use the same gradient colors and glow effects across all cards
2. **Readability**: Ensure sufficient contrast between text and background
3. **Spacing**: Use consistent padding and margins within cards
4. **Responsiveness**: Test on different screen sizes to ensure proper display
5. **Performance**: CSS classes are more performant than inline styles

## Browser Compatibility

The gold gradient card styles use modern CSS features:
- `linear-gradient()` - Supported in all modern browsers
- `box-shadow` with multiple shadows - Supported in all modern browsers
- `border-radius` - Supported in all modern browsers

For older browser support, consider adding fallback styles or using the inline style approach with vendor prefixes.

## Demo Page

Visit `/gold-gradient-demo` to see all the different implementations and variations in action.

## Files Modified

- `tailwind.config.js` - Added gold color definitions and utilities
- `src/app/globals.css` - Added gold gradient card CSS classes
- `src/app/components/GoldGradientCard.tsx` - Created reusable components
- `src/app/gold-gradient-demo/page.tsx` - Created demo page
- `src/app/donate/page.tsx` - Updated existing cards to use new styles

## Troubleshooting

### Glow Not Visible
- Ensure the background is dark enough to show the glow
- Check that `z-index` values are properly set
- Verify shadow values are not being overridden

### Border Not Showing
- Check that `border` is set to `transparent`
- Ensure `background` property includes both `padding-box` and `border-box`
- Verify the container has sufficient contrast with the background

### Performance Issues
- Use CSS classes instead of inline styles when possible
- Limit the number of cards with complex shadows on the same page
- Consider using `will-change: transform` for animated cards
