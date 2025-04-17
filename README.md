# Riverpod Extension - Clean Architecture Feature Generator

## Giới thiệu

Extension này giúp bạn sinh nhanh cấu trúc feature theo Clean Architecture cho Flutter/Dart project, bao gồm các layer: data, domain, presentation.

## Cài đặt & Build

1. Cài dependencies:
   ```sh
   npm install
   ```
2. Build extension:
   ```sh
   npm run compile
   ```

## Sử dụng extension

1. **Mở workspace Flutter/Dart của bạn bằng VS Code.**
2. **Nhấn F5** để chạy extension ở chế độ phát triển (Extension Development Host).
3. **Chạy lệnh**:
   - Mở Command Palette (`Cmd+Shift+P` hoặc `Ctrl+Shift+P`).
   - Gõ: `Generate BLoC Feature` và chọn lệnh `Riverpod Extension: Generate BLoC Feature`.
4. **Nhập tên feature** (ví dụ: `user`, `product`, ...).
5. Extension sẽ tự động tạo thư mục và các file mẫu theo chuẩn Clean Architecture:

```
<feature_name>/
├── data/
│   ├── datasources/
│   ├── models/
│   ├── services/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
└── presentation/
    ├── bloc/
    ├── views/
    └── widgets/
```
